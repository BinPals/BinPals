"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

interface SignupViewProps {
  onSignup: (name: string) => void
  onBack: () => void
}

export function SignupView({ onSignup, onBack }: SignupViewProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [bins, setBins] = useState("4")
  const [frequency, setFrequency] = useState("weekly")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const firstName = name.split(" ")[0]
    onSignup(firstName)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Create your BinPals account</h1>
            <p className="text-gray-600">Sign up and start your valet trash service today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-black mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(623) 555-0100"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-semibold text-black mb-2">
                  Address
                </label>
                <input
                  id="address"
                  placeholder="123 Desert View Dr, Peoria, AZ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="bins" className="block text-sm font-semibold text-black mb-2">
                  Number of Bins
                </label>
                <select
                  id="bins"
                  value={bins}
                  onChange={(e) => setBins(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="2">2 bins</option>
                  <option value="4">4 bins</option>
                  <option value="6">6 bins</option>
                </select>
              </div>

              <div>
                <label htmlFor="frequency" className="block text-sm font-semibold text-black mb-2">
                  Pickup Frequency
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="weekly">Weekly</option>
                  <option value="twice">Twice a week</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
