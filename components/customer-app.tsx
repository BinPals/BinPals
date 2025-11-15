"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Home,
  Bell,
  User,
  Settings,
  LogOut,
  Calendar,
  Pause,
  MessageCircle,
  ChevronRight,
  CreditCard,
} from "lucide-react"

import { cn } from "@/lib/utils"

interface CustomerAppProps {
  userName: string
  onLogout?: () => void
  embedded?: boolean
}

type CustomerView = "dashboard" | "profile" | "notifications" | "billing" | "settings"

export function CustomerApp({ userName, onLogout, embedded = false }: CustomerAppProps) {
  const [currentView, setCurrentView] = useState<CustomerView>("dashboard")

  return (
    <div className={cn(embedded ? "min-h-full" : "min-h-screen", "bg-[#fafafa]")}>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm" style={{ borderColor: "#e5e7eb" }}>
        <div className="flex h-16 items-center justify-between px-6">
          <div className="text-xl font-bold" style={{ color: "#0f172a", letterSpacing: "-0.02em" }}>
            BinPals
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setCurrentView("profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
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
              <Home className="h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView("profile")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "profile" ? "bg-cactus/10 text-cactus" : "text-desert-dark hover:bg-sand/50"
              }`}
            >
              <User className="h-5 w-5" />
              Profile
            </button>
            <button
              onClick={() => setCurrentView("notifications")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "notifications" ? "bg-cactus/10 text-cactus" : "text-desert-dark hover:bg-sand/50"
              }`}
            >
              <Bell className="h-5 w-5" />
              Notifications
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
              Account Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentView === "dashboard" && <CustomerDashboard userName={userName} />}
          {currentView === "profile" && <CustomerProfile userName={userName} />}
          {currentView === "notifications" && <CustomerNotifications />}
          {currentView === "billing" && <CustomerBilling />}
          {currentView === "settings" && <CustomerSettings />}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav
        className={cn(
          "border-t border-sand-border bg-white lg:hidden",
          embedded ? "relative mt-6" : "fixed bottom-0 left-0 right-0 z-50",
        )}
      >
        <div className="grid grid-cols-3">
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`flex flex-col items-center gap-1 py-3 text-xs font-medium ${
              currentView === "dashboard" ? "text-cactus" : "text-desert"
            }`}
          >
            <Home className="h-5 w-5" />
            Home
          </button>
          <button
            onClick={() => setCurrentView("notifications")}
            className={`flex flex-col items-center gap-1 py-3 text-xs font-medium ${
              currentView === "notifications" ? "text-cactus" : "text-desert"
            }`}
          >
            <Bell className="h-5 w-5" />
            Alerts
          </button>
          <button
            onClick={() => setCurrentView("settings")}
            className={`flex flex-col items-center gap-1 py-3 text-xs font-medium ${
              currentView === "settings" ? "text-cactus" : "text-desert"
            }`}
          >
            <User className="h-5 w-5" />
            Account
          </button>
        </div>
      </nav>
    </div>
  )
}

function CustomerDashboard({ userName }: { userName: string }) {
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20 lg:pb-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: "#0f172a", letterSpacing: "-0.02em" }}>
          Welcome back, {userName}
        </h1>
        <p className="text-base mt-1" style={{ color: "#64748b" }}>
          Here's what's happening with your service
        </p>
      </div>

      {/* Status Card */}
      <Card
        className="border-0"
        style={{
          background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
          boxShadow: "0 4px 20px rgba(22, 163, 74, 0.2)",
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Your Plan</p>
              <p className="text-2xl font-bold text-white mt-1">4 bins • Weekly pickup</p>
            </div>
            <div
              className="px-4 py-2 rounded-full font-semibold text-sm"
              style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
            >
              Active
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Pickup - Modern Design */}
      <Card className="border-0" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <CardHeader className="pb-4">
          <CardTitle style={{ color: "#0f172a", fontSize: "20px", fontWeight: 700 }}>Next Pickup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "#f0fdf4", color: "#16a34a" }}
            >
              <Calendar size={24} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg" style={{ color: "#0f172a" }}>
                Tuesday, 6:00–9:00 AM
              </p>
              <p className="text-sm mt-1" style={{ color: "#64748b" }}>
                We'll handle both trash and recycling bins
              </p>
            </div>
            <button
              className="text-sm font-medium flex items-center gap-1 px-3 py-2 rounded-lg transition-colors"
              style={{ color: "#16a34a", background: "#f0fdf4" }}
            >
              View details
              <ChevronRight size={16} />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Pause, label: "Pause Service", desc: "Skip this week" },
          { icon: Calendar, label: "Update Schedule", desc: "Change pickup day" },
          { icon: MessageCircle, label: "Contact Support", desc: "Get help" },
        ].map((action) => (
          <button
            key={action.label}
            className="text-left p-5 rounded-xl border transition-all"
            style={{
              background: "#fff",
              borderColor: "#e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb"
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)"
            }}
          >
            <action.icon className="h-6 w-6 mb-3" style={{ color: "#16a34a" }} />
            <p className="font-semibold" style={{ color: "#0f172a" }}>
              {action.label}
            </p>
            <p className="text-sm mt-1" style={{ color: "#64748b" }}>
              {action.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

function CustomerProfile({ userName }: { userName: string }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20 lg:pb-6">
      <h1 className="text-2xl font-bold text-desert-dark lg:text-3xl">Profile</h1>

      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#D4A574] to-[#C19A6B]">
        <div className="h-32"></div>
        <div className="absolute left-1/2 top-20 -translate-x-1/2">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarFallback className="bg-cactus text-2xl text-white">{userName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="pt-8 text-center">
        <h2 className="text-2xl font-bold text-desert-dark">{userName} Johnson</h2>
        <p className="text-sm text-desert">BinPals member since 2025</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-sand-border bg-white">
          <CardHeader>
            <CardTitle className="text-desert-dark">Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-desert">Plan</p>
              <p className="font-medium text-desert-dark">4 bins • Weekly</p>
            </div>
            <div>
              <p className="text-sm text-desert">Status</p>
              <span className="inline-flex items-center rounded-full bg-cactus/10 px-2.5 py-0.5 text-xs font-medium text-cactus">
                Active
              </span>
            </div>
            <div>
              <p className="text-sm text-desert">Next Pickup</p>
              <p className="font-medium text-desert-dark">Tuesday, 6:00–9:00 AM</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sand-border bg-white">
          <CardHeader>
            <CardTitle className="text-desert-dark">Home Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-desert">Address</p>
              <p className="font-medium text-desert-dark">1234 Desert View Dr</p>
              <p className="text-sm text-desert-dark">Peoria, AZ 85383</p>
            </div>
            <div>
              <p className="text-sm text-desert">Access Notes</p>
              <p className="text-sm text-desert-dark line-clamp-2">
                Bins are located on the left side of the garage. Gate code is 1234.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button variant="outline" className="w-full border-sand-border text-desert-dark hover:bg-sand/50 bg-transparent">
        Edit in Account Settings
      </Button>
    </div>
  )
}

function CustomerNotifications() {
  const [emailReminders, setEmailReminders] = useState(true)
  const [textReminders, setTextReminders] = useState(true)
  const [dayBeforeReminder, setDayBeforeReminder] = useState(true)
  const [sameDayReminder, setSameDayReminder] = useState(false)

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20 lg:pb-6">
      <h1 className="text-2xl font-bold text-desert-dark lg:text-3xl">Notifications</h1>

      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Notification Preferences</CardTitle>
          <CardDescription className="text-desert">
            Choose how you want to receive reminders about your service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-desert-dark">Email reminders</p>
              <p className="text-sm text-desert">Receive pickup reminders via email</p>
            </div>
            <button
              onClick={() => setEmailReminders(!emailReminders)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailReminders ? "bg-cactus" : "bg-desert/30"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailReminders ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-desert-dark">Text message reminders</p>
              <p className="text-sm text-desert">Receive pickup reminders via SMS</p>
            </div>
            <button
              onClick={() => setTextReminders(!textReminders)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                textReminders ? "bg-cactus" : "bg-desert/30"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  textReminders ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-desert-dark">Day-before reminder</p>
              <p className="text-sm text-desert">Get notified the evening before pickup</p>
            </div>
            <button
              onClick={() => setDayBeforeReminder(!dayBeforeReminder)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                dayBeforeReminder ? "bg-cactus" : "bg-desert/30"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  dayBeforeReminder ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-desert-dark">Same-day reminder</p>
              <p className="text-sm text-desert">Get notified on the morning of pickup</p>
            </div>
            <button
              onClick={() => setSameDayReminder(!sameDayReminder)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                sameDayReminder ? "bg-cactus" : "bg-desert/30"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  sameDayReminder ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <Button className="w-full bg-cactus text-white hover:bg-cactus-dark">Save notification settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function CustomerBilling() {
  const billingHistory = [
    { date: "Dec 1, 2024", amount: "$39.00", status: "Paid" },
    { date: "Nov 1, 2024", amount: "$39.00", status: "Paid" },
    { date: "Oct 1, 2024", amount: "$39.00", status: "Paid" },
  ]

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20 lg:pb-6">
      <h1 className="text-2xl font-bold text-desert-dark lg:text-3xl">Billing & Payment</h1>

      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-desert-dark">Standard Plan</p>
            <p className="text-sm text-desert">4 bins • Weekly pickup</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-cactus">$39</span>
            <span className="text-desert">/month</span>
          </div>
          <div>
            <span className="inline-flex items-center rounded-full bg-cactus/10 px-3 py-1 text-sm font-medium text-cactus">
              Active
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full border-sand-border text-desert-dark hover:bg-sand/50 bg-transparent"
          >
            Change plan
          </Button>
        </CardContent>
      </Card>

      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-sand-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-bold text-white">
                VISA
              </div>
              <div>
                <p className="font-medium text-desert-dark">Visa ending in 4242</p>
                <p className="text-sm text-desert">Expires 12/26</p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-sand-border text-desert-dark hover:bg-sand/50 bg-transparent"
          >
            Update card
          </Button>
        </CardContent>
      </Card>

      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingHistory.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-sand-border p-3">
                <div>
                  <p className="font-medium text-desert-dark">{item.date}</p>
                  <p className="text-sm text-desert">{item.amount}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-cactus/10 px-2.5 py-0.5 text-xs font-medium text-cactus">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CustomerSettings() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20 lg:pb-6">
      <h1 className="text-2xl font-bold text-desert-dark lg:text-3xl">Account Settings</h1>

      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Contact Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="settings-email" className="text-desert-dark">
              Email
            </Label>
            <Input id="settings-email" type="email" defaultValue="sarah@example.com" className="border-sand-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-phone" className="text-desert-dark">
              Phone
            </Label>
            <Input id="settings-phone" type="tel" defaultValue="(623) 555-0100" className="border-sand-border" />
          </div>
          <Button className="bg-cactus text-white hover:bg-cactus-dark">Save contact info</Button>
        </CardContent>
      </Card>

      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-desert-dark">
              Current Password
            </Label>
            <Input id="current-password" type="password" placeholder="••••••••" className="border-sand-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-desert-dark">
              New Password
            </Label>
            <Input id="new-password" type="password" placeholder="••••••••" className="border-sand-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-desert-dark">
              Confirm New Password
            </Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" className="border-sand-border" />
          </div>
          <Button className="bg-cactus text-white hover:bg-cactus-dark">Update password</Button>
        </CardContent>
      </Card>

      <Card className="border-sand-border bg-white">
        <CardHeader>
          <CardTitle className="text-desert-dark">Service Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-desert-dark">
              Address
            </Label>
            <Input id="address" defaultValue="1234 Desert View Dr, Peoria, AZ 85383" className="border-sand-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-desert-dark">
              Access Notes
            </Label>
            <Input
              id="notes"
              defaultValue="Bins on left side of garage. Gate code: 1234"
              className="border-sand-border"
            />
          </div>
          <Button className="bg-cactus text-white hover:bg-cactus-dark">Update address</Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/50 bg-white">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
          >
            Pause service
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
