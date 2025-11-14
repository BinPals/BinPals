"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, X } from "lucide-react"

interface ServiceRequestFormProps {
  onComplete: (data: FormData) => void
  onBack: () => void
}

interface PlanConfig {
  name: string
  label: string
  price: string
  description: string
  maxBins: number
  features: string[]
  color: string
}

type FormData = {
  name: string
  email: string
  phone: string
  address: string
  trashBins: number
  recycleBins: number
  plan: string
  planPrice: string
}

const planCatalog: Record<string, PlanConfig> = {
  starter: {
    name: "Starter Plan",
    label: "Starter Plan",
    price: "$39/mo · billed quarterly",
    description: "Service for up to 2 cans with once-per-week set out and return.",
    maxBins: 2,
    features: ["Service for up to 2 cans", "Weekly valet set out & return", "Extra bin add-on available"],
    color: "bg-emerald-500",
  },
  premium: {
    name: "Premium Plan",
    label: "Premium Plan",
    price: "$54/mo · billed quarterly",
    description: "Our most popular valet trash plan for up to 4 cans with flexible pickup days.",
    maxBins: 4,
    features: [
      "Service for up to 4 cans",
      "Dashboard access for schedule updates",
      "Up to two collection days per week",
    ],
    color: "bg-sky-500",
  },
  business: {
    name: "Business Plan",
    label: "Business Plan",
    price: "$65/mo · billed quarterly",
    description: "Extended valet support for large households, casitas, and light commercial needs.",
    maxBins: 999,
    features: ["Service for up to 6 cans", "All Premium benefits included", "Dedicated point of contact"],
    color: "bg-slate-800",
  },
}

export function ServiceRequestForm({ onComplete, onBack }: ServiceRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showPlanPicker, setShowPlanPicker] = useState(false)
  const [manualPlanKey, setManualPlanKey] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    trashBins: 0,
    recycleBins: 0,
    plan: "",
    planPrice: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 4

  const updateField = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    if (field === "trashBins" || field === "recycleBins") {
      setManualPlanKey(null)
    }
  }

  const getSelectedBinTotal = () => {
    return formData.trashBins + formData.recycleBins
  }

  const getRecommendedPlanKey = (): string | null => {
    const total = getSelectedBinTotal()
    if (total === 0) return null
    if (total <= 2) return "starter"
    if (total <= 4) return "premium"
    return "business"
  }

  const determinePlanKey = (): string | null => {
    const recommended = getRecommendedPlanKey()
    if (manualPlanKey) {
      const manualPlan = planCatalog[manualPlanKey]
      const total = getSelectedBinTotal()
      if (manualPlan && total <= manualPlan.maxBins) {
        return manualPlanKey
      }
    }
    return recommended
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email"
      if (!formData.phone.trim()) newErrors.phone = "Phone is required"
      if (!formData.address.trim()) newErrors.address = "Address is required"
    } else if (step === 1) {
      if (formData.trashBins === 0) newErrors.trashBins = "Select trash bins"
      if (formData.recycleBins === undefined || formData.recycleBins < 0) newErrors.recycleBins = "Select recycle bins"
    } else if (step === 2) {
      if (!determinePlanKey()) newErrors.plan = "Select bin counts to see plan"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const planKey = determinePlanKey()
    const plan = planKey ? planCatalog[planKey] : null

    if (!plan) return

    const submissionData = {
      ...formData,
      plan: plan.name,
      planPrice: plan.price,
    }

    try {
      const formBody = new URLSearchParams()
      Object.entries(submissionData).forEach(([key, value]) => {
        formBody.append(key, String(value))
      })

      const response = await fetch("https://formspree.io/f/xgvpgrqg", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      })

      if (response.ok) {
        setIsComplete(true)
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
    }
  }

  const handleRestart = () => {
    setIsComplete(false)
    setCurrentStep(0)
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      trashBins: 0,
      recycleBins: 0,
      plan: "",
      planPrice: "",
    })
    setErrors({})
    setManualPlanKey(null)
  }

  const selectPlan = (key: string) => {
    setManualPlanKey(key)
    setShowPlanPicker(false)
  }

  const progressPercent = (currentStep / Math.max(totalSteps - 1, 1)) * 100

  const planKey = determinePlanKey()
  const currentPlan = planKey ? planCatalog[planKey] : null
  const recommendedKey = getRecommendedPlanKey()

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Request received</h2>
              <p className="text-slate-600 leading-relaxed max-w-lg">
                Thanks! Your request is on its way. A BinPals coordinator will reach out shortly to confirm your clean.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <button
                onClick={onBack}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 22px",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "15px",
                  border: 0,
                  color: "#fff",
                  background: "#16a34a",
                  cursor: "pointer",
                  transition: "0.2s ease",
                }}
              >
                Back to home
              </button>
              <button
                onClick={handleRestart}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 22px",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "15px",
                  background: "transparent",
                  color: "#0f172a",
                  border: "2px solid rgba(15, 23, 42, 0.85)",
                  cursor: "pointer",
                  transition: "0.2s ease",
                }}
              >
                Submit another request
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Get Started in Peoria</h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tell us where you live and how many bins you have. We'll match you with the right plan and confirm your
            pickup days.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-[#22c55e] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span>·</span>
              <span className="font-semibold text-slate-900">
                {currentStep === 0 && "Basic info"}
                {currentStep === 1 && "Bin counts"}
                {currentStep === 2 && "Plan preview"}
                {currentStep === 3 && "Confirm"}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 0: Basic Info */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Basic info</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="First and last"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@email.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="(555) 555-5555"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Service address (Peoria, AZ)</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="Street, City, ZIP"
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Bin Counts */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Bin counts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trashBins">How many trash bins?</Label>
                    <select
                      id="trashBins"
                      value={formData.trashBins}
                      onChange={(e) => updateField("trashBins", Number.parseInt(e.target.value))}
                      className={`flex h-10 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm ${errors.trashBins ? "border-red-500" : ""}`}
                    >
                      <option value="0">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    {errors.trashBins && <p className="text-sm text-red-600">{errors.trashBins}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recycleBins">How many recycle bins?</Label>
                    <select
                      id="recycleBins"
                      value={formData.recycleBins}
                      onChange={(e) => updateField("recycleBins", Number.parseInt(e.target.value))}
                      className={`flex h-10 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm ${errors.recycleBins ? "border-red-500" : ""}`}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    {errors.recycleBins && <p className="text-sm text-red-600">{errors.recycleBins}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Plan Preview */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Plan preview</h3>
                {currentPlan ? (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div
                        className={`w-24 h-24 rounded-2xl ${currentPlan.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-4xl font-bold text-white">
                          {currentPlan.maxBins > 10 ? "6" : currentPlan.maxBins}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{currentPlan.label}</h4>
                        <p className="text-emerald-700 font-bold mb-2">{currentPlan.price}</p>
                        <p className="text-slate-600 text-sm mb-4">{currentPlan.description}</p>
                        <ul className="space-y-2 text-sm">
                          {currentPlan.features.map((feature, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                              <span className="text-slate-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => setShowPlanPicker(true)}
                          className="mt-4 text-sky-600 font-semibold text-sm underline hover:text-sky-700"
                        >
                          Switch plan
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-2xl p-8 text-center bg-slate-50">
                    <p className="text-slate-600">Choose your bin counts to see your match</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirm */}
            {currentStep === 3 && currentPlan && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Confirm</h3>
                <div className="border border-slate-200 rounded-2xl p-6 space-y-6 bg-slate-50">
                  {/* Plan Summary */}
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div
                        className={`w-24 h-24 rounded-2xl ${currentPlan.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-4xl font-bold text-white">
                          {currentPlan.maxBins > 10 ? "6" : currentPlan.maxBins}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{currentPlan.label}</h4>
                        <p className="text-emerald-700 font-bold mb-2">{currentPlan.price}</p>
                        <p className="text-slate-600 text-sm mb-4">{currentPlan.description}</p>
                        <ul className="space-y-2 text-sm">
                          {currentPlan.features.map((feature, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                              <span className="text-slate-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Details Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Name</span>
                      <strong className="text-slate-900">{formData.name}</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Email</span>
                      <strong className="text-slate-900">{formData.email}</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Mobile</span>
                      <strong className="text-slate-900">{formData.phone}</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Service address</span>
                      <strong className="text-slate-900 text-right">{formData.address}</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Trash bins</span>
                      <strong className="text-slate-900">{formData.trashBins}</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Recycle bins</span>
                      <strong className="text-slate-900">{formData.recycleBins}</strong>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-5 h-5 rounded border-slate-300" />
                  <span className="text-sm text-slate-700">I confirm service is in Peoria, AZ or nearby.</span>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 22px",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "15px",
                  background: "transparent",
                  color: "#0f172a",
                  border: "2px solid rgba(15, 23, 42, 0.85)",
                  cursor: currentStep === 0 ? "not-allowed" : "pointer",
                  opacity: currentStep === 0 ? 0.5 : 1,
                  transition: "0.2s ease",
                  minWidth: "128px",
                }}
              >
                Back
              </button>
              <div className="flex-1" />
              {currentStep < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentStep === 2 && !currentPlan}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 22px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "15px",
                    border: 0,
                    color: "#fff",
                    background: currentStep === 2 && !currentPlan ? "#94a3b8" : "#16a34a",
                    cursor: currentStep === 2 && !currentPlan ? "not-allowed" : "pointer",
                    transition: "0.2s ease",
                    minWidth: "128px",
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 22px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "15px",
                    border: 0,
                    color: "#fff",
                    background: "#16a34a",
                    cursor: "pointer",
                    transition: "0.2s ease",
                    minWidth: "128px",
                  }}
                >
                  Submit request
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Plan Picker Modal */}
      {showPlanPicker && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowPlanPicker(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Choose your plan</h3>
                <p className="text-slate-600 text-sm">
                  Pick the BinPals plan that fits your household. Your recommended match is highlighted.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPlanPicker(false)}
                className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(planCatalog).map(([key, plan]) => {
                const isRecommended = key === recommendedKey
                const isSelected = key === planKey
                const total = getSelectedBinTotal()
                const isDisabled = total > plan.maxBins

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => !isDisabled && selectPlan(key)}
                    disabled={isDisabled}
                    className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                      isDisabled
                        ? "border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed"
                        : isSelected
                          ? "border-emerald-500 bg-emerald-50 shadow-lg"
                          : isRecommended
                            ? "border-emerald-300 bg-white shadow-md hover:shadow-lg"
                            : "border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md"
                    }`}
                  >
                    {isRecommended && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-[#16a34a] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                        Recommended
                      </span>
                    )}
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{plan.label}</h4>
                    <p className="text-emerald-700 font-bold text-sm mb-2">{plan.price}</p>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{plan.description}</p>
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
