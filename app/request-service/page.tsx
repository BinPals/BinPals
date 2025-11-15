"use client"

import { useRouter } from "next/navigation"
import { ServiceRequestForm } from "@/components/service-request-form"
import { useDemoSession } from "@/components/providers/demo-session-provider"

export default function RequestServicePage() {
  const router = useRouter()
  const { completeServiceRequest } = useDemoSession()

  return (
    <ServiceRequestForm
      onComplete={(data) => {
        completeServiceRequest(data)
        router.push("/app/customer")
      }}
      onBack={() => router.push("/")}
    />
  )
}
