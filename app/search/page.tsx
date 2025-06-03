"use client"

import { motion } from "framer-motion"
import {
  Search,
  FileText,
  Database,
  BarChart3,
  Users,
  Calendar,
  Download,
  Star,
  Zap,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const mockDatasets = [
  {
    id: 1,
    title: "Nigerian Agricultural Production Data 2020-2023",
    summary:
      "Comprehensive dataset covering crop yields, farming practices, and agricultural output across Nigeria's 36 states.",
    author: "Federal Ministry of Agriculture",
    tags: ["Agriculture", "Nigeria", "Climate", "Economics"],
    fileType: "CSV",
    size: "2.3 MB",
    downloads: 1247,
    lastUpdated: "2 days ago",
    isPaid: false,
    price: null,
    rating: 4.8,
    trending: true,
  },
  {
    id: 2,
    title: "Pidgin English NLP Corpus",
    summary: "Large-scale corpus of Nigerian Pidgin English text data collected from social media and news articles.",
    author: "University of Lagos",
    tags: ["NLP", "Language", "Nigeria", "AI"],
    fileType: "JSON",
    size: "45.7 MB",
    downloads: 892,
    lastUpdated: "1 week ago",
    isPaid: true,
    price: "49.99",
    rating: 4.9,
    trending: false,
  },
  {
    id: 3,
    title: "East African Climate Patterns 1990-2023",
    summary:
      "Historical weather data including temperature, rainfall, and humidity measurements from meteorological stations.",
    author: "East African Meteorological Centre",
    tags: ["Climate", "Weather", "East Africa", "Environment"],
    fileType: "CSV",
    size: "12.1 MB",
    downloads: 634,
    lastUpdated: "3 days ago",
    isPaid: false,
    price: null,
    rating: 4.6,
    trending: true,
  },
  {
    id: 4,
    title: "South African Economic Indicators",
    summary: "Quarterly economic data including GDP, inflation rates, employment statistics, and trade balances.",
    author: "Statistics South Africa",
    tags: ["Economics", "South Africa", "GDP", "Finance"],
    fileType: "Excel",
    size: "5.8 MB",
    downloads: 1156,
    lastUpdated: "5 days ago",
    isPaid: true,
    price: "19.99",
    rating: 4.7,
    trending: false,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function SearchResults() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Search Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6 mb-8">
            <div className="relative max-w-3xl mx-auto">
              <div className="flex items-center bg-gray-50/50 rounded-2xl border border-gray-200/50 p-1">
                <div className="flex items-center pl-4 pr-3">
                  <Search className="text-gray-400 h-5 w-5" />
                </div>
                <Input
                  placeholder="Search datasets..."
                  defaultValue="Nigerian agriculture"
                  className="flex-1 border-0 focus:ring-0 bg-transparent text-base font-medium placeholder:text-gray-400 py-3"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-6 py-3 font-semibold shadow-lg ml-2">
                  <Zap className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-600 font-medium">
                <span className="text-2xl font-bold text-gray-900">{mockDatasets.length}</span> datasets found for
                <span className="text-blue-600 font-semibold"> "Nigerian agriculture"</span>
              </p>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full">
                <Zap className="mr-1 h-3 w-3" />
                AI Enhanced
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="relevance">
                <SelectTrigger className="w-48 border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <motion.div
            className="lg:w-80 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-8">
                  <SlidersHorizontal className="mr-3 h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                </div>

                <div className="space-y-8">
                  {/* File Type Filter */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">File Type</h4>
                    <div className="space-y-3">
                      {["CSV", "JSON", "Excel", "PDF", "Parquet"].map((type) => (
                        <div key={type} className="flex items-center space-x-3">
                          <Checkbox id={type} className="rounded-lg" />
                          <label htmlFor={type} className="text-gray-700 font-medium cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Country Filter */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">Country</h4>
                    <Select>
                      <SelectTrigger className="border-gray-300 rounded-xl">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nigeria">Nigeria</SelectItem>
                        <SelectItem value="kenya">Kenya</SelectItem>
                        <SelectItem value="south-africa">South Africa</SelectItem>
                        <SelectItem value="ghana">Ghana</SelectItem>
                        <SelectItem value="ethiopia">Ethiopia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">Category</h4>
                    <div className="space-y-3">
                      {["Agriculture", "Healthcare", "Economics", "Climate", "NLP", "Demographics"].map((category) => (
                        <div key={category} className="flex items-center space-x-3">
                          <Checkbox id={category} className="rounded-lg" />
                          <label htmlFor={category} className="text-gray-700 font-medium cursor-pointer">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">Price</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox id="free" className="rounded-lg" />
                        <label htmlFor="free" className="text-gray-700 font-medium cursor-pointer">
                          Free
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox id="paid" className="rounded-lg" />
                        <label htmlFor="paid" className="text-gray-700 font-medium cursor-pointer">
                          Paid
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Results Grid */}
          <div className="flex-1">
            <motion.div className="space-y-8" variants={staggerContainer} initial="initial" animate="animate">
              {mockDatasets.map((dataset) => (
                <motion.div key={dataset.id} variants={fadeInUp}>
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden group">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                              {dataset.fileType === "CSV" && <BarChart3 className="h-8 w-8 text-white" />}
                              {dataset.fileType === "JSON" && <Database className="h-8 w-8 text-white" />}
                              {dataset.fileType === "Excel" && <FileText className="h-8 w-8 text-white" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-2xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                                  {dataset.title}
                                </h3>
                                {dataset.isPaid && (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full font-semibold">
                                    Premium
                                  </Badge>
                                )}
                                {dataset.trending && (
                                  <Badge className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full font-semibold">
                                    🔥 Trending
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 mb-4 leading-relaxed text-lg">{dataset.summary}</p>
                              <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-2 font-medium">
                                  <Users className="h-4 w-4" />
                                  {dataset.author}
                                </span>
                                <span className="flex items-center gap-2 font-medium">
                                  <Download className="h-4 w-4" />
                                  {dataset.downloads.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-2 font-medium">
                                  <Calendar className="h-4 w-4" />
                                  {dataset.lastUpdated}
                                </span>
                                <span className="flex items-center gap-2 font-medium">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  {dataset.rating}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 mb-6">
                            {dataset.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer px-4 py-2 rounded-full font-medium transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">
                              {dataset.fileType} • {dataset.size}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 lg:ml-6">
                          <Link href={`/dataset/${dataset.id}`}>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold py-6 px-8 shadow-lg">
                                View Details
                              </Button>
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Load More */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-12 py-6 rounded-2xl font-bold text-lg shadow-lg bg-white/80 backdrop-blur-sm"
                >
                  Load More Results
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
