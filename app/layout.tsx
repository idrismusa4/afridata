import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AuthProvider } from "@/contexts/auth-context"
import { SearchProvider } from '@/contexts/SearchContext'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AfriData - Find the datasets Africa needs",
  description:
    "Search, access, and crowdsource Africa-specific datasets with AI-powered summaries and intelligent tagging.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>
          <AuthProvider>
            <Navigation />
            {children}
            <Footer />
          </AuthProvider>
        </SearchProvider>
      </body>
    </html>
  )
}
