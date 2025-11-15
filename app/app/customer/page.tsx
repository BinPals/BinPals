"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomerApp } from "@/components/customer-app"
import { useDemoSession } from "@/components/providers/demo-session-provider"

export default function CustomerDashboardPage() {
  const router = useRouter()
  const { role, customerName, logout } = useDemoSession()

  useEffect(() => {
    if (role !== "customer") {
      router.replace("/login")
    }
  }, [role, router])

  if (role !== "customer") {
    return null
  }

  return <CustomerApp userName={customerName} onLogout={() => { logout(); router.push("/") }} />
}
