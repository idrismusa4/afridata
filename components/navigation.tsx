"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Database, Search, FileText, Users, Menu, X, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn, user, signOut } = useAuth()

  return (
    <motion.nav
      className="border-b border-gray-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Database className="h-7 w-7 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900">AfriData</span>
              <span className="text-xs text-gray-500 font-medium -mt-1">Africa's Data Universe</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/search"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-semibold group"
            >
              <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Explore</span>
            </Link>
            <Link
              href="/submit-dataset"
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors font-semibold group"
            >
              <FileText className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Contribute</span>
            </Link>
            <Link
              href="/submit-request"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors font-semibold group"
            >
              <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Request</span>
            </Link>
            {isSignedIn && (
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors font-semibold group"
              >
                <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Profile</span>
              </Link>
            )}
          </div>

          {/* Enhanced Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-2xl">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Welcome, {user?.name}</span>
                </div>
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-red-600 font-semibold rounded-xl"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/sign-in">
                  <Button variant="ghost" className="text-gray-600 hover:text-blue-600 font-semibold rounded-xl px-6">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl px-8 shadow-lg">
                      Get Started
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200/50 py-6 bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <Link
                href="/search"
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search className="h-5 w-5" />
                <span>Explore</span>
              </Link>
              <Link
                href="/submit-dataset"
                className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className="h-5 w-5" />
                <span>Contribute</span>
              </Link>
              <Link
                href="/submit-request"
                className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="h-5 w-5" />
                <span>Request</span>
              </Link>
              {isSignedIn && (
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 text-gray-600 hover:text-orange-600 transition-colors font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              )}
              <div className="flex flex-col space-y-4 pt-6 border-t border-gray-200/50">
                {isSignedIn ? (
                  <>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 rounded-2xl">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Welcome, {user?.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-red-600 font-semibold rounded-xl"
                      onClick={() => {
                        signOut()
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-600 hover:text-blue-600 font-semibold rounded-xl"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
