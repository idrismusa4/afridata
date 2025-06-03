"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Download, Star, Users, Calendar, FileText, BarChart3, Eye, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

// Mock dataset data
const dataset = {
  id: 1,
  title: "Nigerian Agricultural Production Data 2020-2023",
  summary:
    "Comprehensive dataset covering crop yields, farming practices, and agricultural output across Nigeria's 36 states. Includes seasonal variations and climate impact analysis with detailed breakdowns by state, crop type, and farming methodology.",
  description: `This comprehensive agricultural dataset provides detailed insights into Nigeria's agricultural landscape from 2020 to 2023. The data covers all 36 states and includes information on:

• Crop yields for major agricultural products including rice, maize, cassava, yam, and cocoa
• Farming practices and methodologies employed across different regions
• Seasonal variations and their impact on agricultural output
• Climate data correlation with crop performance
• Economic indicators related to agricultural productivity
• Infrastructure and technology adoption rates in farming communities

The dataset is particularly valuable for researchers studying food security, climate change impacts on agriculture, and economic development in West Africa. All data has been validated and cross-referenced with multiple sources including state agricultural development programs and international monitoring organizations.`,
  author: "Federal Ministry of Agriculture",
  authorType: "Government",
  tags: ["Agriculture", "Nigeria", "Climate", "Economics", "Food Security"],
  fileType: "CSV",
  size: "2.3 MB",
  downloads: 1247,
  views: 5432,
  lastUpdated: "2 days ago",
  createdDate: "March 15, 2024",
  isPaid: true,
  price: "29.99",
  rating: 4.8,
  reviews: 23,
  license: "Creative Commons Attribution 4.0",
  columns: 47,
  rows: 12840,
  files: [
    { name: "agricultural_data_2020_2023.csv", size: "2.1 MB" },
    { name: "metadata.json", size: "156 KB" },
    { name: "data_dictionary.pdf", size: "89 KB" },
  ],
}

export default function DatasetDetails() {
  const { isSignedIn } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/search" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to search results
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden mb-6">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <BarChart3 className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-4xl font-black text-gray-900 mb-4">{dataset.title}</h1>
                        {dataset.isPaid && (
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full font-bold"
                          >
                            Paid
                          </Badge>
                        )}
                      </div>
                      <p className="text-xl text-gray-600 mb-6 font-medium leading-relaxed">{dataset.summary}</p>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {dataset.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Updated {dataset.lastUpdated}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {dataset.views.toLocaleString()} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {dataset.downloads.toLocaleString()} downloads
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dataset.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer px-4 py-2 rounded-full font-semibold transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-semibold">{dataset.rating}</span>
                      <span className="text-gray-500">({dataset.reviews} reviews)</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-sm text-gray-500">License: {dataset.license}</span>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="data">Data</TabsTrigger>
                      <TabsTrigger value="discussion">Discussion</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                      <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold mb-4">About this dataset</h3>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">{dataset.description}</div>
                      </div>
                    </TabsContent>

                    <TabsContent value="data" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Dataset Information</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg">
                              <div className="text-3xl font-black text-blue-600">{dataset.rows.toLocaleString()}</div>
                              <div className="text-sm text-gray-600">Rows</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg">
                              <div className="text-3xl font-black text-blue-600">{dataset.columns}</div>
                              <div className="text-sm text-gray-600">Columns</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg">
                              <div className="text-3xl font-black text-blue-600">{dataset.size}</div>
                              <div className="text-sm text-gray-600">File Size</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg">
                              <div className="text-3xl font-black text-blue-600">{dataset.fileType}</div>
                              <div className="text-sm text-gray-600">Format</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Files</h3>
                          <div className="space-y-2">
                            {dataset.files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <FileText className="h-5 w-5 text-gray-500" />
                                  <span className="font-medium">{file.name}</span>
                                  <span className="text-sm text-gray-500">{file.size}</span>
                                </div>
                                <Button variant="outline" size="sm">
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="discussion" className="mt-6">
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Join the discussion</h3>
                        <p className="text-gray-600 mb-4">Share your thoughts and questions about this dataset</p>
                        <Button>Start a discussion</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Download Card */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Download Dataset</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {dataset.isPaid ? `$${dataset.price || "29.99"}` : "FREE"}
                    </div>
                    <p className="text-sm text-gray-600">
                      {dataset.isPaid ? "One-time purchase" : "No cost to download"}
                    </p>
                  </div>

                  {dataset.isPaid ? (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl w-full"
                        onClick={() => {
                          if (!isSignedIn) {
                            // Redirect to sign in page
                            window.location.href = "/auth/sign-in"
                          } else {
                            // Handle payment logic here
                            console.log("Process payment")
                          }
                        }}
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Pay Now - ${dataset.price || "29.99"}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl w-full">
                        <Download className="mr-2 h-5 w-5" />
                        Download Free
                      </Button>
                    </motion.div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Author Card */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{dataset.author}</div>
                      <div className="text-sm text-gray-600">{dataset.authorType}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Official government agency responsible for agricultural policy and development in Nigeria.
                  </p>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Related Datasets */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Related Datasets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "West African Crop Yields 2019-2022", downloads: "892" },
                    { title: "Nigerian Climate Data 2020-2023", downloads: "634" },
                    { title: "Agricultural Technology Adoption", downloads: "445" },
                  ].map((related, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <h4 className="font-medium text-gray-900 text-sm mb-1 hover:text-blue-600 cursor-pointer">
                        {related.title}
                      </h4>
                      <p className="text-xs text-gray-500">{related.downloads} downloads</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
