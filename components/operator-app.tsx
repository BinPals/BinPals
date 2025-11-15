"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LayoutDashboard, Users, MapPin, CreditCard, Settings, LogOut, Filter, Check, X, Search } from "lucide-react"

import { cn } from "@/lib/utils"

interface OperatorAppProps {
  onLogout?: () => void
  embedded?: boolean
}

type OperatorView = "dashboard" | "routes" | "customers" | "billing" | "settings"
type StopStatus = "active" | "skip" | "paused"

interface Stop {
  id: string
  name: string
  address: string
  bins: number
  status: StopStatus
  neighborhood: string
}

export function OperatorApp({ onLogout, embedded = false }: OperatorAppProps) {
  const [currentView, setCurrentView] = useState<OperatorView>("dashboard")

  return (
    <div className={cn(embedded ? "min-h-full" : "min-h-screen", "bg-sand") }>
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-sand-border bg-white">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-desert-dark">BinPals</div>
            <span className="hidden text-sm text-desert md:inline">Operator Console</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-desert">Today: Jan 13, 2025</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                  <Avatar>
                    <AvatarFallback className="bg-desert-dark text-white">OP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setCurrentView("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLogout?.()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-64 border-r border-sand-border bg-white min-h-[calc(100vh-4rem)]">
          <nav className="space-y-1 p-4">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "dashboard" ? "bg-cactus/10 text-cactus" : "text-desert-dark hover:bg-sand/50"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView("routes")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "routes" ? "bg-cactus/10 text-cactus" : "text-desert-dark hover:bg-sand/50"
              }`}
            >
              <MapPin className="h-5 w-5" />
              Routes
            </button>
            <button
              onClick={() => setCurrentView("customers")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "customers" ? "bg-cactus/10 text-cactus" : "text-desert-dark hover:bg-sand/50"
              }`}
            >
              <Users className="h-5 w-5" />
              Customers
            </button>
            <button
              onClick={() => setCurrentView("billing")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "billing" ? "bg-cactus/10 text-cactus" : "text-desert-dark hover:bg-sand/50"
              }`}
            >
              <CreditCard className="h-5 w-5" />
              Billing
            </button>
            <button
              onClick={() => setCurrentView("settings")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "settings" ? "bg-cactus/10 text-cactus" : "text-desert-dark hover:bg-sand/50"
              }`}
            >
              <Settings className="h-5 w-5" />
              Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {currentView === "dashboard" && <OperatorDashboard />}
          {currentView === "routes" && <OperatorRoutes />}
          {currentView === "customers" && <OperatorCustomers />}
          {currentView === "billing" && <OperatorBilling />}
          {currentView === "settings" && <OperatorSettings />}
        </main>
      </div>
    </div>
  )
}

function OperatorDashboard() {
  const [stops, setStops] = useState<Stop[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      address: "1234 Desert View Dr",
      bins: 4,
      status: "active",
      neighborhood: "Vistancia",
    },
    { id: "2", name: "Michael Chen", address: "5678 Cactus Ln", bins: 2, status: "active", neighborhood: "Vistancia" },
    {
      id: "3",
      name: "Jennifer Martinez",
      address: "910 Saguaro Way",
      bins: 4,
      status: "skip",
      neighborhood: "Vistancia",
    },
    { id: "4", name: "David Wilson", address: "2345 Sunset Blvd", bins: 6, status: "active", neighborhood: "Trilogy" },
    { id: "5", name: "Lisa Anderson", address: "6789 Mesa Dr", bins: 4, status: "paused", neighborhood: "Trilogy" },
    {
      id: "6",
      name: "Robert Taylor",
      address: "1357 Canyon Rd",
      bins: 2,
      status: "active",
      neighborhood: "Fletcher Heights",
    },
    {
      id: "7",
      name: "Emily Brown",
      address: "2468 Valley View",
      bins: 4,
      status: "active",
      neighborhood: "Fletcher Heights",
    },
  ])

  const toggleSkip = (id: string) => {
    setStops(
      stops.map((stop) =>
        stop.id === id ? { ...stop, status: stop.status === "skip" ? "active" : ("skip" as StopStatus) } : stop,
      ),
    )
  }

  const markDone = (id: string) => {
    // In a real app, this would mark the stop as complete
    alert("Stop marked as done!")
  }

  const activeStops = stops.filter((s) => s.status === "active").length
  const skippedStops = stops.filter((s) => s.status === "skip").length
  const pausedStops = stops.filter((s) => s.status === "paused").length

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-desert-dark lg:text-3xl">Today's Overview</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-sand-border bg-white">
          <CardHeader className="pb-3">
            <CardDescription className="text-desert">Stops Today</CardDescription>
            <CardTitle className="text-3xl text-cactus">{activeStops}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-sand-border bg-white">
          <CardHeader className="pb-3">
            <CardDescription className="text-desert">Skips This Week</CardDescription>
            <CardTitle className="text-3xl text-sunset">{skippedStops}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-sand-border bg-white">
          <CardHeader className="pb-3">
            <CardDescription className="text-desert">Paused Accounts</CardDescription>
            <CardTitle className="text-3xl text-desert">{pausedStops}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-sand-border bg-white">
          <CardHeader className="pb-3">
            <CardDescription className="text-desert">Past Due Billing</CardDescription>
            <CardTitle className="text-3xl text-sunset">$78</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Route List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <Card className="border-sand-border bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Select defaultValue="today">
                  <SelectTrigger className="w-[140px] border-sand-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] border-sand-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Neighborhoods</SelectItem>
                    <SelectItem value="vistancia">Vistancia</SelectItem>
                    <SelectItem value="trilogy">Trilogy</SelectItem>
                    <SelectItem value="fletcher">Fletcher Heights</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" className="border-sand-border text-desert-dark bg-transparent">
                  <Filter className="mr-2 h-4 w-4" />
                  Show skips only
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Grouped Stops */}
          <div className="space-y-6">
            {["Vistancia", "Trilogy", "Fletcher Heights"].map((neighborhood) => {
              const neighborhoodStops = stops.filter((s) => s.neighborhood === neighborhood)
              if (neighborhoodStops.length === 0) return null

              return (
                <Card key={neighborhood} className="border-sand-border bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg text-desert-dark">{neighborhood} – Morning Route</CardTitle>
                    <CardDescription className="text-desert">{neighborhoodStops.length} stops</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {neighborhoodStops.map((stop) => (
                      <div
                        key={stop.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-sand-border p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-desert-dark truncate">{stop.name}</p>
                          <p className="text-sm text-desert truncate">{stop.address}</p>
                          <p className="text-xs text-desert">{stop.bins} bins</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              stop.status === "active"
                                ? "bg-cactus/10 text-cactus"
                                : stop.status === "skip"
                                  ? "bg-sunset/10 text-sunset"
                                  : "bg-desert/10 text-desert"
                            }`}
                          >
                            {stop.status === "active" ? "Active" : stop.status === "skip" ? "Skip this week" : "Paused"}
                          </span>

                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markDone(stop.id)}
                              className="h-8 border-cactus text-cactus hover:bg-cactus/10"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleSkip(stop.id)}
                              className="h-8 border-sunset text-sunset hover:bg-sunset/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Mini Map */}
        <div className="hidden lg:block">
          <Card className="border-sand-border bg-white sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg text-desert-dark">Today's Route Map</CardTitle>
            </CardHeader>
            <CardContent>
              <svg width="100%" height="400" viewBox="0 0 300 400" className="bg-sand/30 rounded-lg">
                {/* Background streets */}
                <rect x="0" y="0" width="300" height="400" fill="#F5EFE7" />

                {/* Zone labels */}
                <text x="50" y="80" fontSize="12" fill="#8B6F47" fontWeight="500">
                  North Peoria
                </text>
                <text x="180" y="200" fontSize="12" fill="#8B6F47" fontWeight="500">
                  Vistancia
                </text>
                <text x="50" y="320" fontSize="12" fill="#8B6F47" fontWeight="500">
                  Trilogy
                </text>

                {/* Streets */}
                <line x1="0" y1="100" x2="300" y2="100" stroke="#D4A574" strokeWidth="2" />
                <line x1="0" y1="220" x2="300" y2="220" stroke="#D4A574" strokeWidth="2" />
                <line x1="100" y1="0" x2="100" y2="400" stroke="#D4A574" strokeWidth="2" />
                <line x1="200" y1="0" x2="200" y2="400" stroke="#D4A574" strokeWidth="2" />

                {/* Stop markers */}
                {/* Active stops - green */}
                <circle cx="120" cy="140" r="8" fill="#4A7C59" className="hover:r-10 transition-all cursor-pointer" />
                <circle cx="180" cy="160" r="8" fill="#4A7C59" className="hover:r-10 transition-all cursor-pointer" />
                <circle cx="220" cy="180" r="8" fill="#4A7C59" className="hover:r-10 transition-all cursor-pointer" />
                <circle cx="80" cy="260" r="8" fill="#4A7C59" className="hover:r-10 transition-all cursor-pointer" />

                {/* Skip - red */}
                <circle cx="140" cy="180" r="8" fill="#C84B31" className="hover:r-10 transition-all cursor-pointer" />

                {/* Paused - gray */}
                <circle cx="160" cy="280" r="8" fill="#8B8B8B" className="hover:r-10 transition-all cursor-pointer" />

                {/* Hover tooltips would go here in a real implementation */}
              </svg>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#4A7C59]" />
                  <span className="text-desert">Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#C84B31]" />
                  <span className="text-desert">Skip</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#8B8B8B]" />
                  <span className="text-desert">Paused</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function OperatorRoutes() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <h1 className="text-2xl font-bold text-desert-dark lg:text-3xl">Routes</h1>

      {/* Filters */}
      <Card className="border-sand-border bg-white">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Select defaultValue="monday">
              <SelectTrigger className="w-[140px] border-sand-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="morning">
              <SelectTrigger className="w-[140px] border-sand-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="midday">Midday</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] border-sand-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Neighborhoods</SelectItem>
                <SelectItem value="vistancia">Vistancia</SelectItem>
                <SelectItem value="trilogy">Trilogy</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="border-sand-border text-desert-dark bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Show skips only
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Route Summary */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-desert-dark">Route Summary</h2>

          <Card className="border-sand-border bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base text-desert-dark">Route A – North Peoria</CardTitle>
              <CardDescription className="text-desert">11 stops • 6:00–8:00 AM</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="inline-flex items-center rounded-full bg-sunset/10 px-2.5 py-0.5 text-xs font-medium text-sunset">
                2 skips
              </span>
            </CardContent>
          </Card>

          <Card className="border-sand-border bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base text-desert-dark">Route B – Vistancia / Trilogy</CardTitle>
              <CardDescription className="text-desert">9 stops • 8:00–10:00 AM</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="inline-flex items-center rounded-full bg-cactus/10 px-2.5 py-0.5 text-xs font-medium text-cactus">
                0 skips
              </span>
            </CardContent>
          </Card>

          <Card className="border-sand-border bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base text-desert-dark">Route C – Old Town Peoria</CardTitle>
              <CardDescription className="text-desert">7 stops • 10:00–11:30 AM</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="inline-flex items-center rounded-full bg-sunset/10 px-2.5 py-0.5 text-xs font-medium text-sunset">
                1 skip
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Stops Detail */}
        <div className="lg:col-span-2">
          <Card className="border-sand-border bg-white">
            <CardHeader>
              <CardTitle className="text-desert-dark">Stops on Route A</CardTitle>
              <CardDescription className="text-desert">Skips here apply to this week only</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "Sarah Johnson", address: "1234 Desert View Dr", bins: 4, status: "active" },
                  { name: "Michael Chen", address: "5678 Cactus Ln", bins: 2, status: "active" },
                  { name: "Jennifer Martinez", address: "910 Saguaro Way", bins: 4, status: "skip" },
                  { name: "David Wilson", address: "2345 Sunset Blvd", bins: 6, status: "active" },
                  { name: "Lisa Anderson", address: "6789 Mesa Dr", bins: 4, status: "skip" },
                ].map((stop, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-sand-border p-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-desert-dark">{stop.name}</p>
                      <p className="text-sm text-desert">{stop.address}</p>
                      <p className="text-xs text-desert">{stop.bins} bins</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          stop.status === "active" ? "bg-cactus/10 text-cactus" : "bg-sunset/10 text-sunset"
                        }`}
                      >
                        {stop.status === "active" ? "Active" : "Skip this week"}
                      </span>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-sunset text-sunset hover:bg-sunset/10 bg-transparent"
                        >
                          Skip this week
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-cactus text-cactus hover:bg-cactus/10 bg-transparent"
                        >
                          Mark done
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function OperatorCustomers() {
  const [searchQuery, setSearchQuery] = useState("")

  const customers = [
    {
      name: "Sarah Johnson",
      neighborhood: "Vistancia",
      plan: "4 bins • weekly",
      day: "Tuesday",
      status: "active",
      billing: "Paid",
    },
    {
      name: "Michael Chen",
      neighborhood: "Vistancia",
      plan: "2 bins • weekly",
      day: "Tuesday",
      status: "active",
      billing: "Paid",
    },
    {
      name: "Jennifer Martinez",
      neighborhood: "Trilogy",
      plan: "4 bins • weekly",
      day: "Wednesday",
      status: "skip",
      billing: "Paid",
    },
    {
      name: "David Wilson",
      neighborhood: "Fletcher Heights",
      plan: "6 bins • weekly",
      day: "Monday",
      status: "active",
      billing: "Past due",
    },
    {
      name: "Lisa Anderson",
      neighborhood: "Trilogy",
      plan: "4 bins • weekly",
      day: "Wednesday",
      status: "paused",
      billing: "Paid",
    },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <h1 className="text-2xl font-bold text-desert-dark lg:text-3xl">Customers</h1>

      {/* Search and Filters */}
      <Card className="border-sand-border bg-white">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-desert" />
              <Input
                placeholder="Search by name, email, or address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-sand-border"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-sand-border bg-cactus/10 text-cactus hover:bg-cactus/20"
              >
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-sand-border text-desert-dark hover:bg-sand/50 bg-transparent"
              >
                Active
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-sand-border text-desert-dark hover:bg-sand/50 bg-transparent"
              >
                Skip
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-sand-border text-desert-dark hover:bg-sand/50 bg-transparent"
              >
                Paused
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-sand-border text-desert-dark hover:bg-sand/50 bg-transparent"
              >
                Past due
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="border-sand-border bg-white">
        <CardContent className="pt-6">
          <div className="space-y-3">
            {customers.map((customer, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-sand-border p-4 hover:bg-sand/20 transition-colors"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-medium text-desert-dark">{customer.name}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-desert">
                    <span>{customer.neighborhood}</span>
                    <span>•</span>
                    <span>{customer.plan}</span>
                    <span>•</span>
                    <span>{customer.day}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      customer.status === "active"
                        ? "bg-cactus/10 text-cactus"
                        : customer.status === "skip"
                          ? "bg-sunset/10 text-sunset"
                          : "bg-desert/10 text-desert"
                    }`}
                  >
                    {customer.status === "active" ? "Active" : customer.status === "skip" ? "Skip" : "Paused"}
                  </span>

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      customer.billing === "Paid" ? "bg-cactus/10 text-cactus" : "bg-sunset/10 text-sunset"
                    }`}
                  >
                    {customer.billing}
                  </span>

                  <Button
                    size="sm"
                    variant="outline"
                    className="border-sand-border text-desert-dark hover:bg-sand/50 bg-transparent"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function OperatorBilling() {
  const billingData = [
    { name: "Sarah Johnson", plan: "4 bins • weekly", amount: "$39.00", lastPayment: "Jan 1, 2025", status: "Paid" },
    { name: "Michael Chen", plan: "2 bins • weekly", amount: "$29.00", lastPayment: "Jan 1, 2025", status: "Paid" },
    {
      name: "Jennifer Martinez",
      plan: "4 bins • weekly",
      amount: "$39.00",
      lastPayment: "Jan 1, 2025",
      status: "Pending",
    },
    { name: "David Wilson", plan: "6 bins • weekly", amount: "$49.00", lastPayment: "Nov 1, 2024", status: "Past due" },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <h1 className="text-2xl font-bold text-desert-dark lg:text-3xl">Billing</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-sand-border bg-white">
          <CardHeader className="pb-3">
            <CardDescription className="text-desert">Active Subscriptions</CardDescription>
            <CardTitle className="text-3xl text-cactus">27</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-sand-border bg-white">
          <CardHeader className="pb-3">
            <CardDescription className="text-desert">Past Due Accounts</CardDescription>
            <CardTitle className="text-3xl text-sunset">2</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-sand-border bg-white">
          <CardHeader className="pb-3">
            <CardDescription className="text-desert">This Month (est.)</CardDescription>
            <CardTitle className="text-3xl text-cactus">$1,053</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Billing Table */}
      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Billing Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingData.map((item, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-sand-border p-4"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-medium text-desert-dark">{item.name}</p>
                  <p className="text-sm text-desert">{item.plan}</p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <p className="font-medium text-desert-dark">{item.amount}</p>
                    <p className="text-desert">{item.lastPayment}</p>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === "Paid"
                        ? "bg-cactus/10 text-cactus"
                        : item.status === "Pending"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-sunset/10 text-sunset"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function OperatorSettings() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-desert-dark lg:text-3xl">Settings</h1>

      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Operator Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="op-name" className="text-desert-dark">
              Name
            </Label>
            <Input id="op-name" defaultValue="BinPals Operations" className="border-sand-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="op-email" className="text-desert-dark">
              Email
            </Label>
            <Input id="op-email" type="email" defaultValue="operations@binpals.com" className="border-sand-border" />
          </div>
          <Button className="bg-cactus text-white hover:bg-cactus-dark">Save changes</Button>
        </CardContent>
      </Card>

      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-desert-dark">Show mini-map by default</p>
              <p className="text-sm text-desert">Display route map on dashboard</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-cactus transition-colors">
              <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
