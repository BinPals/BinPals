(function() {
  const body = document.body;
  const page = body.dataset.page || "";
  const isContact = page === "contact";

  const headerTarget = document.querySelector('[data-component="site-header"]');
  if (headerTarget) {
    const ctaHref = isContact ? "#estimateForm" : "contact-us.html#estimateForm";
    const navLink = (hrefPage) => (page === hrefPage ? " class=\"active\"" : "");

    headerTarget.innerHTML = `
<header class="site-header">
  <div class="header-inner">
    <a href="index.html" class="header-logo-wrap">
      <img src="binpals-trash-valet-logo.png" class="header-logo" alt="BinPals Trash Valet" />
    </a>

    <div class="header-actions">
      <nav class="header-nav">
        <a href="index.html"${navLink("home")}>Home</a>
        <a href="pricing.html"${navLink("pricing")}>Pricing</a>
        <a href="contact-us.html"${navLink("contact")}>Contact</a>
      </nav>

      <a href="${ctaHref}" class="header-cta">Start Service</a>
    </div>

    <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Toggle menu">
      <span class="menu-icon" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  </div>
</header>`;

    const siteHeader = headerTarget.querySelector(".site-header");
    const menuToggle = headerTarget.querySelector(".menu-toggle");
    const closeMenu = () => {
      siteHeader.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const willOpen = !siteHeader.classList.contains("menu-open");
      siteHeader.classList.toggle("menu-open", willOpen);
      menuToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    const menuLinks = headerTarget.querySelectorAll(".header-nav a, .header-cta");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
          closeMenu();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        closeMenu();
      }
    });
  }

  const footerTarget = document.querySelector('[data-component="site-footer"]');
  if (footerTarget) {
    const ctaHref = isContact ? "#estimateForm" : "contact-us.html#estimateForm";

    footerTarget.innerHTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-column">
        <img src="binpals-trash-valet-logo.png" class="footer-logo" alt="BinPals Trash Valet" />
        <div class="footer-brand-sub">Weekly pull-out & return for your bins.</div>
        <a href="${ctaHref}" class="footer-btn">Get Estimate</a>
      </div>

      <div class="footer-column">
        <div class="footer-heading">CONTACT</div>
        <div class="footer-contact-text">
          Email: <span><a href="mailto:Binpalsteam@gmail.com">Binpalsteam@gmail.com</a></span>
        </div>
      </div>

      <div class="footer-column">
        <div class="footer-heading">SERVICE AREA</div>
        <ul class="footer-service-list">
          <li>Peoria, AZ</li>
          <li>North Peoria, AZ</li>
          <li>Vistancia, AZ</li>
        </ul>
        <a href="${ctaHref}" class="footer-btn">Our Routes</a>
      </div>
    </div>

    <div class="footer-bottom">
      © <span id="footerYear"></span> BinPals Trash Valet. All Rights Reserved.
    </div>
  </div>
</footer>`;

    const yearEl = footerTarget.querySelector("#footerYear");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
})();
