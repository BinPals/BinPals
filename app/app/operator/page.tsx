"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { OperatorApp } from "@/components/operator-app"
import { useDemoSession } from "@/components/providers/demo-session-provider"

export default function OperatorConsolePage() {
  const router = useRouter()
  const { role, logout } = useDemoSession()

  useEffect(() => {
    if (role !== "operator") {
      router.replace("/login")
    }
  }, [role, router])

  if (role !== "operator") {
    return null
  }

  return <OperatorApp onLogout={() => { logout(); router.push("/") }} />
}
