"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  User,
  Download,
  Eye,
  Bookmark,
  Settings,
  Calendar,
  BarChart3,
  FileText,
  Database,
  Edit,
  Mail,
  MapPin,
  Building,
  Globe,
  Star,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

// Mock user data
const userData = {
  id: 1,
  name: "Dr. Amara Okafor",
  email: "amara.okafor@university.edu.ng",
  avatar: "/placeholder.svg?height=120&width=120",
  title: "Senior Research Fellow",
  organization: "University of Lagos",
  location: "Lagos, Nigeria",
  website: "https://research.unilag.edu.ng/amara",
  joinDate: "March 2023",
  bio: "Agricultural economist specializing in food security and climate adaptation in West Africa. Passionate about using data to drive sustainable development policies.",
  stats: {
    datasetsDownloaded: 23,
    datasetsVisited: 156,
    datasetsBookmarked: 12,
    datasetsContributed: 3,
    totalSpent: 127.5,
    reviewsWritten: 8,
  },
}

// Mock datasets data
const downloadedDatasets = [
  {
    id: 1,
    title: "Nigerian Agricultural Production Data 2020-2023",
    author: "Federal Ministry of Agriculture",
    downloadDate: "2024-01-15",
    price: 29.99,
    fileSize: "2.3 MB",
    downloads: 1247,
    rating: 4.8,
  },
  {
    id: 2,
    title: "West African Climate Patterns 1990-2023",
    author: "ECOWAS Climate Centre",
    downloadDate: "2024-01-10",
    price: 0,
    fileSize: "12.1 MB",
    downloads: 634,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Lagos Urban Development Indicators",
    author: "Lagos State Government",
    downloadDate: "2024-01-08",
    price: 15.99,
    fileSize: "5.7 MB",
    downloads: 892,
    rating: 4.7,
  },
]

const visitedDatasets = [
  {
    id: 4,
    title: "Pidgin English NLP Corpus",
    author: "University of Lagos",
    visitDate: "2024-01-20",
    price: 49.99,
    rating: 4.9,
  },
  {
    id: 5,
    title: "South African Economic Indicators",
    author: "Statistics South Africa",
    visitDate: "2024-01-19",
    price: 19.99,
    rating: 4.7,
  },
  {
    id: 6,
    title: "Kenyan Healthcare Facility Database",
    author: "Ministry of Health Kenya",
    visitDate: "2024-01-18",
    price: 0,
    rating: 4.5,
  },
  {
    id: 7,
    title: "Ethiopian Coffee Production Data",
    author: "Ethiopian Coffee Association",
    visitDate: "2024-01-17",
    price: 24.99,
    rating: 4.8,
  },
]

const bookmarkedDatasets = [
  {
    id: 8,
    title: "African Language Models Dataset",
    author: "AI4D Research",
    bookmarkDate: "2024-01-16",
    price: 89.99,
    rating: 4.9,
  },
  {
    id: 9,
    title: "Sahel Region Drought Patterns",
    author: "CILSS Observatory",
    bookmarkDate: "2024-01-14",
    price: 0,
    rating: 4.6,
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

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardContent className="p-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Avatar className="w-40 h-40">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback className="text-3xl bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 font-black">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-4xl font-black text-gray-900 mb-3">{userData.name}</h1>
                      <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold mb-3">
                        {userData.title}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {userData.organization}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {userData.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined {userData.joinDate}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed max-w-2xl font-medium text-lg">{userData.bio}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-lg">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-2xl font-bold shadow-lg"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            { label: "Downloaded", value: userData.stats.datasetsDownloaded, icon: Download, color: "text-green-600" },
            { label: "Visited", value: userData.stats.datasetsVisited, icon: Eye, color: "text-blue-600" },
            { label: "Bookmarked", value: userData.stats.datasetsBookmarked, icon: Bookmark, color: "text-purple-600" },
            {
              label: "Contributed",
              value: userData.stats.datasetsContributed,
              icon: Database,
              color: "text-orange-600",
            },
            { label: "Total Spent", value: `$${userData.stats.totalSpent}`, icon: TrendingUp, color: "text-red-600" },
            { label: "Reviews", value: userData.stats.reviewsWritten, icon: Star, color: "text-yellow-600" },
          ].map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
              <TabsTrigger value="visited">Recently Visited</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-black text-gray-900">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        action: "Downloaded",
                        dataset: "Nigerian Agricultural Production Data",
                        time: "2 hours ago",
                        icon: Download,
                      },
                      {
                        action: "Bookmarked",
                        dataset: "African Language Models Dataset",
                        time: "1 day ago",
                        icon: Bookmark,
                      },
                      { action: "Visited", dataset: "Pidgin English NLP Corpus", time: "2 days ago", icon: Eye },
                      { action: "Reviewed", dataset: "West African Climate Patterns", time: "3 days ago", icon: Star },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <activity.icon className="h-4 w-4 text-gray-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action} <span className="text-blue-600">{activity.dataset}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-black text-gray-900">
                      <Settings className="h-5 w-5 text-blue-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/submit-dataset">
                      <Button variant="outline" className="w-full justify-start">
                        <Database className="mr-2 h-4 w-4" />
                        Contribute Dataset
                      </Button>
                    </Link>
                    <Link href="/submit-request">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        Request Dataset
                      </Button>
                    </Link>
                    <Link href="/search">
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="mr-2 h-4 w-4" />
                        Explore Datasets
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-black text-gray-900">
                    <User className="h-5 w-5 text-blue-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-900">{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-gray-600" />
                        <a href={userData.website} className="text-blue-600 hover:text-blue-700">
                          {userData.website}
                        </a>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-900">{userData.organization}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-900">{userData.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="downloaded" className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Downloaded Datasets ({downloadedDatasets.length})
                </h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export List
                </Button>
              </div>

              <div className="space-y-4">
                {downloadedDatasets.map((dataset, index) => (
                  <motion.div
                    key={dataset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                              {dataset.title}
                            </h4>
                            <p className="text-gray-600 mb-3">by {dataset.author}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Downloaded: {new Date(dataset.downloadDate).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{dataset.fileSize}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                {dataset.rating}
                              </span>
                              <span>•</span>
                              <span>{dataset.downloads.toLocaleString()} downloads</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              className={
                                dataset.price > 0
                                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full font-bold"
                                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-bold"
                              }
                            >
                              {dataset.price > 0 ? `$${dataset.price}` : "Free"}
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="mr-1 h-3 w-3" />
                                Re-download
                              </Button>
                              <Link href={`/dataset/${dataset.id}`}>
                                <Button size="sm" variant="outline">
                                  <Eye className="mr-1 h-3 w-3" />
                                  View
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="visited" className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recently Visited ({visitedDatasets.length})</h3>
                <Button variant="outline" size="sm">
                  Clear History
                </Button>
              </div>

              <div className="space-y-4">
                {visitedDatasets.map((dataset, index) => (
                  <motion.div
                    key={dataset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                              {dataset.title}
                            </h4>
                            <p className="text-gray-600 mb-3">by {dataset.author}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Visited: {new Date(dataset.visitDate).toLocaleDateString()}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                {dataset.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              className={
                                dataset.price > 0
                                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full font-bold"
                                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-bold"
                              }
                            >
                              {dataset.price > 0 ? `$${dataset.price}` : "Free"}
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Bookmark className="mr-1 h-3 w-3" />
                                Bookmark
                              </Button>
                              <Link href={`/dataset/${dataset.id}`}>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-lg"
                                >
                                  <Eye className="mr-1 h-3 w-3" />
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bookmarks" className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Bookmarked Datasets ({bookmarkedDatasets.length})
                </h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Bookmarks
                </Button>
              </div>

              <div className="space-y-4">
                {bookmarkedDatasets.map((dataset, index) => (
                  <motion.div
                    key={dataset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                              {dataset.title}
                            </h4>
                            <p className="text-gray-600 mb-3">by {dataset.author}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Bookmarked: {new Date(dataset.bookmarkDate).toLocaleDateString()}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                {dataset.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              className={
                                dataset.price > 0
                                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full font-bold"
                                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-bold"
                              }
                            >
                              {dataset.price > 0 ? `$${dataset.price}` : "Free"}
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Bookmark className="mr-1 h-3 w-3 fill-current" />
                                Remove
                              </Button>
                              <Link href={`/dataset/${dataset.id}`}>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-lg"
                                >
                                  <Eye className="mr-1 h-3 w-3" />
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
