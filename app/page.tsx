"use client"

import { motion } from "framer-motion"
import {
  Search,
  Database,
  Users,
  ArrowRight,
  FileText,
  BarChart3,
  Map,
  TrendingUp,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-6xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="flex items-center justify-center mb-6" variants={fadeInUp}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Africa's Premier Data Platform
              </div>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 mb-8 leading-tight"
              variants={fadeInUp}
            >
              Discover Africa's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Data Universe
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
              variants={fadeInUp}
            >
              The ultimate platform for African datasets. Search with AI, contribute to research, and unlock insights
              that drive the continent forward.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div className="max-w-4xl mx-auto mb-16" variants={fadeInUp}>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-3 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="flex items-center pl-6 pr-4">
                    <Search className="text-gray-400 h-6 w-6" />
                  </div>
                  <Input
                    placeholder="Search for datasets... Try 'Nigerian agriculture' or 'Swahili NLP'"
                    className="flex-1 border-0 focus:ring-0 bg-transparent text-lg placeholder:text-gray-400 font-medium"
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg">
                    <Zap className="mr-2 h-5 w-5" />
                    Search
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20" variants={fadeInUp}>
              {[
                { number: "2,847", label: "Datasets", icon: Database },
                { number: "54", label: "Countries", icon: Globe },
                { number: "12.4K", label: "Downloads", icon: TrendingUp },
                { number: "1,205", label: "Contributors", icon: Users },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 group-hover:shadow-xl transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-semibold">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" variants={fadeInUp}>
              <Link href="/search">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 rounded-2xl font-bold text-lg shadow-2xl"
                  >
                    <Database className="mr-3 h-6 w-6" />
                    Explore Datasets
                  </Button>
                </motion.div>
              </Link>
              <Link href="/submit-dataset">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-10 py-6 rounded-2xl font-bold text-lg shadow-lg backdrop-blur-sm bg-white/80"
                  >
                    <FileText className="mr-3 h-6 w-6" />
                    Contribute Data
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 mb-6">
              <Sparkles className="h-4 w-4" />
              Why Choose AfriData
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
              Built for the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Future
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Cutting-edge tools and AI-powered insights designed for researchers, developers, and innovators shaping
              Africa's digital transformation.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Search,
                title: "AI-Powered Search",
                description:
                  "Find exactly what you need with natural language queries and smart recommendations powered by machine learning.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50",
              },
              {
                icon: BarChart3,
                title: "Instant Analytics",
                description:
                  "Get real-time insights, quality scores, and data profiling with our advanced analytics engine.",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50",
              },
              {
                icon: Users,
                title: "Global Community",
                description:
                  "Connect with researchers worldwide, collaborate on projects, and contribute to Africa's data ecosystem.",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${feature.bgGradient} group overflow-hidden relative`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
                  <CardContent className="p-10 text-center relative z-10">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-medium text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
              Trending
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Categories
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Explore the most popular dataset categories driving African innovation
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: TrendingUp,
                title: "Economics",
                count: "342",
                color: "from-green-500 to-emerald-500",
                bg: "from-green-50 to-emerald-50",
              },
              {
                icon: FileText,
                title: "NLP & AI",
                count: "189",
                color: "from-purple-500 to-violet-500",
                bg: "from-purple-50 to-violet-50",
              },
              {
                icon: Map,
                title: "Climate",
                count: "267",
                color: "from-blue-500 to-cyan-500",
                bg: "from-blue-50 to-cyan-50",
              },
              {
                icon: Users,
                title: "Social Data",
                count: "156",
                color: "from-orange-500 to-red-500",
                bg: "from-orange-50 to-red-50",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${category.bg} cursor-pointer group overflow-hidden relative`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
                  <CardContent className="p-8 text-center relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 mb-2">
                      {category.count}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">datasets</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Ready to unlock
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Africa's potential?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              Join thousands of innovators, researchers, and developers building the future with African data.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/auth/sign-up">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-6 rounded-2xl font-bold text-lg shadow-2xl"
                  >
                    Get Started Free
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/search">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-6 rounded-2xl font-bold text-lg backdrop-blur-sm"
                  >
                    Explore Now
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
