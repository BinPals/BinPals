"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"

type Role = "customer" | "operator"

interface DemoSessionContextValue {
  role: Role | null
  customerName: string
  operatorName: string
  loginCustomer: (name?: string) => void
  loginOperator: (name?: string) => void
  completeServiceRequest: (data: { name?: string }) => void
  logout: () => void
}

const DemoSessionContext = createContext<DemoSessionContextValue | undefined>(undefined)

const DEFAULT_CUSTOMER_NAME = "Sarah"
const DEFAULT_OPERATOR_NAME = "Chris"

export function DemoSessionProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null)
  const [customerName, setCustomerName] = useState(DEFAULT_CUSTOMER_NAME)
  const [operatorName, setOperatorName] = useState(DEFAULT_OPERATOR_NAME)

  const loginCustomer = useCallback((name?: string) => {
    setCustomerName((prev) => name?.trim() || prev || DEFAULT_CUSTOMER_NAME)
    setRole("customer")
  }, [])

  const loginOperator = useCallback((name?: string) => {
    setOperatorName((prev) => name?.trim() || prev || DEFAULT_OPERATOR_NAME)
    setRole("operator")
  }, [])

  const completeServiceRequest = useCallback((data: { name?: string }) => {
    const extractedName = data.name?.trim()
    setCustomerName(extractedName || DEFAULT_CUSTOMER_NAME)
    setRole("customer")
  }, [])

  const logout = useCallback(() => {
    setRole(null)
  }, [])

  const value = useMemo(
    () => ({ role, customerName, operatorName, loginCustomer, loginOperator, completeServiceRequest, logout }),
    [role, customerName, operatorName, loginCustomer, loginOperator, completeServiceRequest, logout],
  )

  return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>
}

export function useDemoSession() {
  const context = useContext(DemoSessionContext)
  if (!context) {
    throw new Error("useDemoSession must be used within a DemoSessionProvider")
  }
  return context
}
