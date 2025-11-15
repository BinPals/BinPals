"use client"

import { useRouter } from "next/navigation"
import { MarketingSite } from "@/components/marketing-site"

export default function HomePage() {
  const router = useRouter()

  return (
    <MarketingSite
      onGetStarted={() => router.push("/request-service")}
      onLogin={() => router.push("/login")}
    />
  )
}
