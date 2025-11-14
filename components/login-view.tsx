"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

type Role = "customer" | "operator"

interface LoginViewProps {
  onLogin: (role: Role) => void
  onSignup: () => void
  onBack: () => void
}

export function LoginView({ onLogin, onSignup, onBack }: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<Role>("customer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(selectedRole)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Login to BinPals</h1>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setSelectedRole("customer")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  selectedRole === "customer" ? "bg-white text-black shadow-sm" : "text-gray-600 hover:text-black"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("operator")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  selectedRole === "operator" ? "bg-white text-black shadow-sm" : "text-gray-600 hover:text-black"
                }`}
              >
                Operator
              </button>
            </div>

            <div className="space-y-4">
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
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
            >
              Login
            </button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSignup}
                className="font-semibold text-green-600 hover:text-green-700 hover:underline"
              >
                Create customer account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
