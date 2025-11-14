"use client"

import { useState } from "react"
import { MarketingSite } from "@/components/marketing-site"
import { LoginView } from "@/components/login-view"
import { SignupView } from "@/components/signup-view"
import { CustomerApp } from "@/components/customer-app"
import { OperatorApp } from "@/components/operator-app"
import { ServiceRequestForm } from "@/components/service-request-form"

type View = "marketing" | "login" | "signupCustomer" | "serviceRequest" | "customerApp" | "operatorApp"
type Role = "customer" | "operator"

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("marketing")
  const [userRole, setUserRole] = useState<Role>("customer")
  const [userName, setUserName] = useState("Sarah")

  const handleLogin = (role: Role) => {
    setUserRole(role)
    setCurrentView(role === "customer" ? "customerApp" : "operatorApp")
  }

  const handleSignup = (name: string) => {
    setUserName(name)
    setUserRole("customer")
    setCurrentView("customerApp")
  }

  const handleServiceRequestComplete = (data: any) => {
    setUserName(data.name)
    setUserRole("customer")
    setCurrentView("customerApp")
  }

  const handleLogout = () => {
    setCurrentView("marketing")
  }

  return (
    <>
      {currentView === "marketing" && (
        <MarketingSite onGetStarted={() => setCurrentView("serviceRequest")} onLogin={() => setCurrentView("login")} />
      )}
      {currentView === "login" && (
        <LoginView
          onLogin={handleLogin}
          onSignup={() => setCurrentView("serviceRequest")}
          onBack={() => setCurrentView("marketing")}
        />
      )}
      {currentView === "signupCustomer" && (
        <SignupView onSignup={handleSignup} onBack={() => setCurrentView("marketing")} />
      )}
      {currentView === "serviceRequest" && (
        <ServiceRequestForm onComplete={handleServiceRequestComplete} onBack={() => setCurrentView("marketing")} />
      )}
      {currentView === "customerApp" && <CustomerApp userName={userName} onLogout={handleLogout} />}
      {currentView === "operatorApp" && <OperatorApp onLogout={handleLogout} />}
    </>
  )
}
