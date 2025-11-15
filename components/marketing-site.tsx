"use client"

import { useState } from "react"
import { Menu, X, ArrowRight, Check, ChevronDown } from "lucide-react"

import { CustomerApp } from "@/components/customer-app"
import { OperatorApp } from "@/components/operator-app"
import { ServiceRequestForm } from "@/components/service-request-form"

export function MarketingSite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number>(0)
  const [pricingPeriod, setPricingPeriod] = useState<"monthly" | "quarterly">("monthly")

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const appSectionId = "customer-app"
  const requestSectionId = "service-request"

  const handleViewApp = () => scrollToSection(appSectionId)
  const handleGetStarted = () => scrollToSection(requestSectionId)

  const faqs = [
    {
      q: "What does BinPals do?",
      a: "We take your trash and recycling bins to the curb on pickup day and return them after collection. Simple as that.",
    },
    {
      q: "Do you serve all of Peoria?",
      a: "Yes! We serve all residential areas in Peoria, AZ. Not sure if we cover your area? Just request service and we'll confirm.",
    },
    {
      q: "What if I'm traveling or away?",
      a: "Perfect! We're ideal for snowbirds and travelers. Your bins are handled whether you're home or not.",
    },
    {
      q: "How does billing work?",
      a: "Simple monthly billing. Cancel anytime. No contracts or hidden fees.",
    },
    {
      q: "Can I pause my service?",
      a: "Absolutely. Pause or resume service anytime through your dashboard or by contacting us.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold text-gray-900 flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white text-xl">
                🗑️
              </div>
              <span>BinPals</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                FAQ
              </button>
              <button onClick={handleViewApp} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Login
              </button>
              <button
                onClick={handleGetStarted}
                className="bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-700 hover:text-gray-900 font-medium text-left py-2"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-700 hover:text-gray-900 font-medium text-left py-2"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-700 hover:text-gray-900 font-medium text-left py-2"
              >
                FAQ
              </button>
              <button onClick={handleViewApp} className="text-gray-700 hover:text-gray-900 font-medium text-left py-2">
                Login
              </button>
              <button
                onClick={handleGetStarted}
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Get Started
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold mb-8">
              <span>🌵</span>
              Serving Peoria, Arizona
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Never Drag Your <span className="text-green-600">Bins</span> Again
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Weekly trash valet service for busy homeowners and travelers. We handle your bins so you don't have to.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Unified App Experience */}
      <section id={appSectionId} className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">One Experience for Web and App</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The same interface powers your public website and the live customer and operator dashboards.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Customer App</span>
                <h3 className="text-3xl font-bold text-gray-900 mt-3">Everything residents need</h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Residents sign in to the exact experience you showcase on the marketing site. Manage pickups, billing, and alerts without context switching.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-green-600 mt-1" size={18} />
                    <span className="text-gray-700">Schedule reminders, pause service, and confirm pickups from any device.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-600 mt-1" size={18} />
                    <span className="text-gray-700">Real-time notifications keep homeowners updated on service status.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-600 mt-1" size={18} />
                    <span className="text-gray-700">Billing, profile updates, and support live in one streamlined workspace.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-[32px] border border-gray-200 shadow-2xl ring-1 ring-black/5 overflow-hidden bg-white">
                <div className="h-[720px] overflow-y-auto">
                  <CustomerApp embedded userName="Sarah" onLogout={scrollToTop} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Operator Console</span>
                <h3 className="text-3xl font-bold text-gray-900 mt-3">Stay on top of every route</h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Dispatchers use the same design system to track stops, reconcile billing, and communicate with customers.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-green-600 mt-1" size={18} />
                    <span className="text-gray-700">Filter routes by neighborhood and update stop statuses instantly.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-600 mt-1" size={18} />
                    <span className="text-gray-700">Review customers, invoices, and route capacity in one dashboard.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-600 mt-1" size={18} />
                    <span className="text-gray-700">Shared components make marketing updates automatically reflect in-app.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-[32px] border border-gray-200 shadow-2xl ring-1 ring-black/5 overflow-hidden bg-white">
                <div className="h-[720px] overflow-y-auto">
                  <OperatorApp embedded onLogout={scrollToTop} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={handleGetStarted}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
            >
              Start Your Service
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple, reliable service that fits into your life</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-green-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us your address, bin count, and pickup schedule. We'll match you with the perfect plan.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-green-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">We Handle It</h3>
              <p className="text-gray-600 leading-relaxed">
                We take your bins to the curb on pickup day and return them after collection. Every single week.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-green-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enjoy Your Time</h3>
              <p className="text-gray-600 leading-relaxed">
                Spend your time on what matters. We'll send you updates so you're always in the loop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="relative py-20 px-6 bg-[url('/pricing-texture.svg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="w-full h-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.55)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600 mb-8">Choose the plan that fits your needs. Cancel anytime.</p>

            <div className="inline-flex items-center gap-2 p-1 bg-gray-100 rounded-full">
              <button
                onClick={() => setPricingPeriod("monthly")}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  pricingPeriod === "monthly"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPricingPeriod("quarterly")}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  pricingPeriod === "quarterly"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Quarterly
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-green-600 transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-6">Perfect for small households</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">${pricingPeriod === "monthly" ? "45" : "35"}</span>
                <span className="text-gray-600">/{pricingPeriod === "monthly" ? "month" : "quarter"}</span>
              </div>
              <button
                onClick={handleGetStarted}
                className="w-full bg-gray-900 text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors mb-8"
              >
                Get Started
              </button>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Up to 2 bins</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Weekly service</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Text notifications</span>
                </li>
              </ul>
            </div>

            {/* Premium - Featured */}
            <div className="bg-green-600 rounded-2xl p-8 border-2 border-green-600 relative transform md:scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <p className="text-green-50 mb-6">Best for active families</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">${pricingPeriod === "monthly" ? "59" : "49"}</span>
                <span className="text-green-50">/{pricingPeriod === "monthly" ? "month" : "quarter"}</span>
              </div>
              <button
                onClick={handleGetStarted}
                className="w-full bg-white text-green-600 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors mb-8"
              >
                Get Started
              </button>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white">Up to 4 bins</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white">Twice weekly available</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white">Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-white flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white">Dashboard access</span>
                </li>
              </ul>
            </div>

            {/* One-Time */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-green-600 transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">One-Time</h3>
              <p className="text-gray-600 mb-6">Need help just once?</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$25</span>
                <span className="text-gray-600">/service</span>
              </div>
              <button
                onClick={handleGetStarted}
                className="w-full bg-gray-900 text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors mb-8"
              >
                Get Started
              </button>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Single service</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Up to 3 bins</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">No commitment</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Same-day available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Request */}
      <section id={requestSectionId} className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                <span>📅</span>
                Start your valet service
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Get scheduled in minutes</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Drop in your address and bin count, pick the plan that fits, and we handle the rest. The request flow you see here is exactly what customers use when they sign up inside the app.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="mt-1 text-green-600" size={18} />
                  <span className="text-gray-700">Smart plan recommendations based on trash and recycling bin totals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 text-green-600" size={18} />
                  <span className="text-gray-700">Form submissions route straight to the BinPals team—no duplicate marketing pages required.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 text-green-600" size={18} />
                  <span className="text-gray-700">Customers can restart the flow anytime to update schedules or add new properties.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-[32px] border border-gray-200 shadow-2xl ring-1 ring-black/5 overflow-hidden">
              <ServiceRequestForm embedded onBack={scrollToTop} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 flex-shrink-0 transition-transform ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Make Trash Day Effortless?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join hundreds of Peoria residents who never worry about their bins
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
          >
            Get Started Today
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white text-sm">
                  🗑️
                </div>
                BinPals
              </div>
              <p className="text-gray-600 text-sm">Making life easier, one bin at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="block text-gray-600 hover:text-gray-900 text-sm"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="block text-gray-600 hover:text-gray-900 text-sm"
                >
                  Pricing
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("faq")}
                  className="block text-gray-600 hover:text-gray-900 text-sm"
                >
                  FAQ
                </button>
                <button onClick={handleViewApp} className="block text-gray-600 hover:text-gray-900 text-sm">
                  Login
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <p className="text-gray-600 text-sm mb-2">hello@binpals.com</p>
              <p className="text-gray-600 text-sm">(623) 555-0100</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
            © 2025 BinPals Trash Valet. All rights reserved. Serving Peoria, Arizona.
          </div>
        </div>
      </footer>
    </div>
  )
}
