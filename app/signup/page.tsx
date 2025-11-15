"use client"

import { useRouter } from "next/navigation"
import { SignupView } from "@/components/signup-view"
import { useDemoSession } from "@/components/providers/demo-session-provider"

export default function SignupPage() {
  const router = useRouter()
  const { loginCustomer } = useDemoSession()

  return (
    <SignupView
      onSignup={(name) => {
        loginCustomer(name)
        router.push("/app/customer")
      }}
      onBack={() => router.push("/login")}
    />
  )
}
