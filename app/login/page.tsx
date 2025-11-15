"use client"

import { useRouter } from "next/navigation"
import { LoginView } from "@/components/login-view"
import { useDemoSession } from "@/components/providers/demo-session-provider"

type Role = "customer" | "operator"

export default function LoginPage() {
  const router = useRouter()
  const { loginCustomer, loginOperator } = useDemoSession()

  const handleLogin = (role: Role) => {
    if (role === "customer") {
      loginCustomer()
      router.push("/app/customer")
    } else {
      loginOperator()
      router.push("/app/operator")
    }
  }

  return (
    <LoginView
      onLogin={handleLogin}
      onSignup={() => router.push("/signup")}
      onBack={() => router.push("/")}
    />
  )
}
