"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface AuthContextType {
  isSignedIn: boolean
  user: { name: string; email: string } | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSignedIn(true)
    setUser({ name: "John Doe", email })
  }

  const signOut = () => {
    setIsSignedIn(false)
    setUser(null)
  }

  return <AuthContext.Provider value={{ isSignedIn, user, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
