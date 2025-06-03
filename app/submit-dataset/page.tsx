"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Upload, FileText, Database, ArrowLeft, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function SubmitDataset() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    license: "",
    isPaid: false,
    price: "",
    source: "",
    methodology: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles(files.map((file) => file.name))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-md w-full border border-gray-200 shadow-lg bg-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dataset Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for contributing to AfriData. Your dataset is now under review and will be published within
                2-3 business days.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Submit Another Dataset
                </Button>
                <Link href="/search">
                  <Button variant="outline" className="w-full">
                    Browse Datasets
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Database className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contribute a Dataset</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help build Africa's largest data repository by sharing your datasets with the community. Your contribution
              will help researchers, developers, and organizations across the continent.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border border-gray-200 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">Dataset Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Basic Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Dataset Title *
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="e.g., 'Nigerian Agricultural Production Data 2020-2023'"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a detailed description of your dataset, including what it contains, how it was collected, and potential use cases..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={6}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                        Category *
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="economics">Economics & Finance</SelectItem>
                          <SelectItem value="climate">Climate & Environment</SelectItem>
                          <SelectItem value="nlp">Natural Language Processing</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="demographics">Demographics</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                        Country/Region *
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nigeria">Nigeria</SelectItem>
                          <SelectItem value="kenya">Kenya</SelectItem>
                          <SelectItem value="south-africa">South Africa</SelectItem>
                          <SelectItem value="ghana">Ghana</SelectItem>
                          <SelectItem value="ethiopia">Ethiopia</SelectItem>
                          <SelectItem value="egypt">Egypt</SelectItem>
                          <SelectItem value="morocco">Morocco</SelectItem>
                          <SelectItem value="multi-country">Multiple Countries</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        placeholder="Add a tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-700">
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-blue-900">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Dataset Files</h3>

                  <div className="space-y-2">
                    <Label htmlFor="files" className="text-sm font-medium text-gray-700">
                      Upload Files *
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-900">Drop files here or click to upload</p>
                        <p className="text-sm text-gray-600">
                          Supports CSV, JSON, Excel, Parquet, and compressed files
                        </p>
                        <input
                          id="files"
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".csv,.json,.xlsx,.xls,.parquet,.zip,.tar.gz"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("files")?.click()}
                        >
                          Choose Files
                        </Button>
                      </div>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{file}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Licensing and Pricing */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Licensing & Access
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="license" className="text-sm font-medium text-gray-700">
                      License *
                    </Label>
                    <Select
                      value={formData.license}
                      onValueChange={(value) => setFormData({ ...formData, license: value })}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select a license" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cc-by">Creative Commons Attribution 4.0</SelectItem>
                        <SelectItem value="cc-by-sa">Creative Commons Attribution-ShareAlike 4.0</SelectItem>
                        <SelectItem value="cc-by-nc">Creative Commons Attribution-NonCommercial 4.0</SelectItem>
                        <SelectItem value="mit">MIT License</SelectItem>
                        <SelectItem value="apache">Apache License 2.0</SelectItem>
                        <SelectItem value="custom">Custom License</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPaid"
                        checked={formData.isPaid}
                        onCheckedChange={(checked) => setFormData({ ...formData, isPaid: checked as boolean })}
                      />
                      <Label htmlFor="isPaid" className="text-sm font-medium text-gray-700">
                        This is a paid dataset
                      </Label>
                    </div>

                    {formData.isPaid && (
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                          Price (USD) *
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Additional Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="source" className="text-sm font-medium text-gray-700">
                      Data Source
                    </Label>
                    <Input
                      id="source"
                      type="text"
                      placeholder="e.g., 'Federal Ministry of Agriculture', 'University Research', 'Survey Data'"
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="methodology" className="text-sm font-medium text-gray-700">
                      Collection Methodology
                    </Label>
                    <Textarea
                      id="methodology"
                      placeholder="Describe how the data was collected, any preprocessing steps, quality assurance measures, etc."
                      value={formData.methodology}
                      onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                      rows={4}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold shadow-lg"
                    >
                      <Database className="mr-2 h-5 w-5" />
                      Submit Dataset for Review
                    </Button>
                  </motion.div>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Your dataset will be reviewed by our team and published within 2-3 business days.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
