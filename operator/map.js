// ===============================
// BinPals Operator Map
// Clean v2 with:
// - Start/Stop route
// - Animated progress
// - Distance traveled today
// ===============================

// ----- Core map state -----
let map;
let geocoder;
let markers = [];
let markerById = new Map();

let stops = [];          // all stops coming from backend
let filteredStops = [];  // currently filtered (for this operator, lat/lng present)
let selectedIndex = 0;

// Route + progress state
let directionsService;
let directionsRenderer;
let routeRunning = false;
window.routeRunning = routeRunning;
let totalDistanceMeters = 0;

// DOM refs (set after DOMContentLoaded)
let btnMarkDoneEl;
let btnSkipEl;
let btnStartStopEl;
let runStatsLabelEl;
let runDistanceLabelEl;
let runProgressBarEl;
let currentAddressEl;
let currentPlanEl;
let currentBinsEl;
let currentPhoneEl;
let currentStatusEl;
let currentStatusTagEl;

// Get operator from URL, e.g. ?op=OP01
function getOperatorIdFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const op =
      (params.get("op") ||
        params.get("operator") ||
        params.get("operatorId") ||
        "").trim();
    return op.toUpperCase();
  } catch (e) {
    console.warn("Could not read operator from URL:", e);
    return "";
  }
}

// ===============================
//  INIT ENTRYPOINT (called by Google Maps callback)
// ===============================
function initOperatorMap() {
  const operatorId = getOperatorIdFromUrl();

  // 1. Load data from global
  if (Array.isArray(window.BINPALS_STOPS)) {
    stops = window.BINPALS_STOPS.slice();
  } else {
    console.warn("BINPALS_STOPS missing or not an array.");
    stops = [];
  }

  // 1a. Filter by operator (frontend-side)
  let operatorStops = stops;
  if (operatorId) {
    operatorStops = stops.filter(function (s) {
      return (String(s.operatorId || "").toUpperCase() === operatorId);
    });
  }

  // 1b. Only keep stops that have lat/lng
  filteredStops = operatorStops.filter(function (s) {
    return typeof s.lat === "number" && typeof s.lng === "number";
  });

  // 2. Basic map
  const mapEl = document.getElementById("map");
  if (!mapEl) {
    console.error("#map element not found.");
    return;
  }

  map = new google.maps.Map(mapEl, {
    center: { lat: 33.4484, lng: -112.0740 }, // Phoenix-ish default
    zoom: 12,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false
  });

  geocoder = new google.maps.Geocoder();

  // 3. Directions API for road-following route line
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    preserveViewport: true,
    polylineOptions: {
      strokeColor: "#16A34A",
      strokeOpacity: 0.85,
      strokeWeight: 3
    }
  });
  directionsRenderer.setMap(map);

  // 4. Setup DOM references & events
  hookDom();

  // If there are no stops for this operator, just reset the UI and bail
  if (!filteredStops.length) {
    console.log("No stops for operator or no geocoded stops.");
    updateProgressUi();
    updateDistanceUi();
    if (currentAddressEl) currentAddressEl.textContent = "No houses for this filter.";
    return;
  }

  renderMarkers();
  autoSelectFirstStop();
  updateUiForSelection();
  setRouteRunningState(true);
  updateProgressUi();
}

// Make initOperatorMap global for Google callback
window.initOperatorMap = initOperatorMap;

// ===============================
// DOM wiring
// ===============================
function hookDom() {
  btnMarkDoneEl      = document.getElementById("btnMarkDone");
  btnSkipEl          = document.getElementById("btnSkip");
  btnStartStopEl     = document.getElementById("btnStartStop");
  runStatsLabelEl    = document.getElementById("runStatsLabel");
  runDistanceLabelEl = document.getElementById("runDistanceLabel");
  runProgressBarEl   = document.getElementById("runProgressBar");
  currentAddressEl   = document.getElementById("currentAddress");
  currentPlanEl      = document.getElementById("currentPlan");
  currentBinsEl      = document.getElementById("currentBins");
  currentPhoneEl     = document.getElementById("currentPhone");
  currentStatusEl    = document.getElementById("currentStatus");
  currentStatusTagEl = document.getElementById("currentStatusTag");

  if (btnMarkDoneEl) {
    btnMarkDoneEl.addEventListener("click", onMarkDone);
  }
  if (btnSkipEl) {
    btnSkipEl.addEventListener("click", onSkip);
  }
  if (btnStartStopEl) {
    btnStartStopEl.addEventListener("click", onStartStopToggle);
  }
}

function setRouteRunningState(nextState) {
  routeRunning = nextState;
  window.routeRunning = routeRunning;

  if (btnStartStopEl) {
    btnStartStopEl.textContent = routeRunning ? "Route running" : "Start route";
  }

  if (routeRunning) {
    totalDistanceMeters = 0;
    updateDistanceUi();
    drawCurrentSegment();
  } else {
    clearRouteLine();
  }
}

// ===============================
// Markers + selection
// ===============================
function renderMarkers() {
  // Clear any existing markers
  markers.forEach(function (m) { m.setMap(null); });
  markers = [];
  markerById.clear();

  if (!filteredStops.length) return;

  const bounds = new google.maps.LatLngBounds();

  filteredStops.forEach(function (stop, index) {
    const pos = { lat: stop.lat, lng: stop.lng };

    const marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: stop.fullAddress || stop.address || stop.name || "Stop",
      icon: makeMarkerIcon(false)   // not selected by default
    });

    marker.addListener("click", function () {
      setSelectedIndex(index);
    });

    markers.push(marker);
    markerById.set(stop.id, marker);
    bounds.extend(pos);
  });

  if (!bounds.isEmpty()) {
    map.fitBounds(bounds);
  }
}

function makeMarkerIcon(isSelected) {
  const baseColor = isSelected ? "#16A34A" : "#2563EB";

  // Simple circle SVG
  const svg =
    `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="10" fill="${baseColor}" />
      <circle cx="14" cy="14" r="6" fill="#ffffff" />
    </svg>`;

  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(28, 28),
    anchor: new google.maps.Point(14, 14)
  };
}

function autoSelectFirstStop() {
  if (!filteredStops.length) return;

  // Prefer first Pending, fall back to first stop
  const pendingIndex = filteredStops.findIndex(function (s) {
    return (s.status || "").toLowerCase() === "pending";
  });

  selectedIndex = pendingIndex >= 0 ? pendingIndex : 0;
  highlightSelectedMarker();
  centerMapOnSelected();
}

function setSelectedIndex(index) {
  if (index < 0 || index >= filteredStops.length) return;
  selectedIndex = index;
  highlightSelectedMarker();
  centerMapOnSelected();
  updateUiForSelection();

  if (routeRunning) {
    drawCurrentSegment();
  }
}

function highlightSelectedMarker() {
  markers.forEach(function (marker, i) {
    marker.setIcon(makeMarkerIcon(i === selectedIndex));
    marker.setZIndex(i === selectedIndex ? 1000 : 1);
  });
}

function centerMapOnSelected() {
  const stop = filteredStops[selectedIndex];
  if (!stop || !map) return;

  map.panTo({ lat: stop.lat, lng: stop.lng });
  map.setZoom(Math.max(map.getZoom(), 15));
}

// ===============================
// Route line (Directions API)
// ===============================
function clearRouteLine() {
  if (directionsRenderer) {
    directionsRenderer.set("directions", null);
  }
}

function drawCurrentSegment() {
  if (!routeRunning) return;
  if (!filteredStops.length) return;

  const current = filteredStops[selectedIndex];
  const next = filteredStops[selectedIndex + 1];

  if (!next) {
    clearRouteLine();
    return;
  }

  directionsService.route(
    {
      origin:      { lat: current.lat, lng: current.lng },
      destination: { lat: next.lat,    lng: next.lng    },
      travelMode: google.maps.TravelMode.DRIVING
    },
    function (result, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Directions request failed:", status);
        clearRouteLine();
      }
    }
  );
}

// ===============================
// Button handlers
// ===============================
function onStartStopToggle() {
  if (!filteredStops.length) return;

  setRouteRunningState(!routeRunning);
}

function onMarkDone() {
  if (!filteredStops.length) return;

  const current = filteredStops[selectedIndex];

  // 1. Update status locally
  current.status = "Done";

  // 2. Calculate segment distance if route is running
  if (routeRunning) {
    const next = filteredStops[selectedIndex + 1];
    if (next) {
      const d = haversineMeters(current.lat, current.lng, next.lat, next.lng);
      totalDistanceMeters += d;
      updateDistanceUi();
    }
  }

  // 3. Move to next
  if (selectedIndex < filteredStops.length - 1) {
    selectedIndex += 1;
  }
  highlightSelectedMarker();
  centerMapOnSelected();
  updateUiForSelection();
  updateProgressUi();

  if (routeRunning) {
    drawCurrentSegment();
  }

  // TODO: send status change back to server / Apps Script
}

function onSkip() {
  if (!filteredStops.length) return;

  const current = filteredStops[selectedIndex];
  current.status = "Skipped";

  if (selectedIndex < filteredStops.length - 1) {
    selectedIndex += 1;
  }

  highlightSelectedMarker();
  centerMapOnSelected();
  updateUiForSelection();
  updateProgressUi();

  if (routeRunning) {
    drawCurrentSegment();
  }

  // TODO: send "Skipped" to backend if you want
}

// Expose control to other scripts
window.onStartStopToggle = onStartStopToggle;

// ===============================
// UI updates: current card + progress + distance
// ===============================
function updateUiForSelection() {
  const stop = filteredStops[selectedIndex];
  if (!stop) return;

  const addr = stop.fullAddress || stop.address || "";

  if (currentAddressEl) {
    currentAddressEl.textContent = addr;
  }
  if (currentPlanEl) {
    currentPlanEl.textContent = stop.plan || "";
  }
  if (currentBinsEl) {
    const binsText =
      stop.bins == null || stop.bins === ""
        ? ""
        : String(stop.bins) + " bins";
    currentBinsEl.textContent = binsText;
  }
  if (currentPhoneEl) {
    currentPhoneEl.textContent = stop.phone || "";
  }
  if (currentStatusEl) {
    currentStatusEl.textContent = stop.status || "Pending";
  }
  if (currentStatusTagEl) {
    currentStatusTagEl.textContent = stop.status || "Pending";
  }
}

function updateProgressUi() {
  const total = filteredStops.length;
  if (!total) {
    if (runStatsLabelEl) runStatsLabelEl.textContent = "0 left today / 0 total";
    if (runProgressBarEl) runProgressBarEl.style.width = "0%";
    return;
  }

  const doneCount = filteredStops.filter(function (s) {
    const sStatus = (s.status || "").toLowerCase();
    return sStatus === "done" || sStatus === "completed";
  }).length;

  const leftCount = total - doneCount;
  const pct = (doneCount / total) * 100;

  if (runStatsLabelEl) {
    runStatsLabelEl.textContent = leftCount + " left today / " + total + " total";
  }

  if (runProgressBarEl) {
    runProgressBarEl.style.width = pct.toFixed(1) + "%";
  }
}

function updateDistanceUi() {
  const miles = totalDistanceMeters / 1609.344;
  if (runDistanceLabelEl) {
    runDistanceLabelEl.textContent =
      "Today’s run: " + miles.toFixed(1) + " mi";
  }
}

// ===============================
// Distance helper (Haversine)
// ===============================
function haversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // meters
  const toRad = function (deg) { return deg * Math.PI / 180; };

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
