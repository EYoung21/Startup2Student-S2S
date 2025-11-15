"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessagingPanel } from "@/components/messaging-panel"
import { Search, Star, MapPin, Mail, TrendingUp } from 'lucide-react'

const schools = [
  { id: 1, name: "Harvard University", location: "Cambridge, MA", students: 234, logo: "H" },
  { id: 2, name: "MIT", location: "Cambridge, MA", students: 189, logo: "M" },
  { id: 3, name: "Stanford University", location: "Stanford, CA", students: 312, logo: "S" },
  { id: 4, name: "Haverford College", location: "Haverford, PA", students: 45, logo: "H" },
  { id: 5, name: "Swarthmore College", location: "Swarthmore, PA", students: 38, logo: "S" },
  { id: 6, name: "Bryn Mawr College", location: "Bryn Mawr, PA", students: 42, logo: "B" },
]

const students = [
  { id: 1, name: "Sarah Chen", school: "Harvard", rating: 4.9, completedJobs: 47, email: "schen@harvard.edu", avatar: "/diverse-female-student.png" },
  { id: 2, name: "Marcus Johnson", school: "Harvard", rating: 4.8, completedJobs: 35, email: "mjohnson@harvard.edu", avatar: "/male-student-studying.png" },
  { id: 3, name: "Emma Rodriguez", school: "Harvard", rating: 4.95, completedJobs: 62, email: "erodriguez@harvard.edu", avatar: "/female-student-latina.jpg" },
  { id: 4, name: "David Park", school: "Harvard", rating: 4.7, completedJobs: 28, email: "dpark@harvard.edu", avatar: "/male-student-asian.jpg" },
]

export function StartupView() {
  const [selectedSchool, setSelectedSchool] = useState(schools[0])
  const [showMessaging, setShowMessaging] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null)

  const handleContactStudent = (student: typeof students[0]) => {
    setSelectedStudent(student)
    setShowMessaging(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-8 rounded-xl bg-accent p-8 text-accent-foreground">
        <h2 className="mb-2 text-balance text-3xl font-bold">Find Student Ambassadors at Top Universities</h2>
        <p className="mb-6 max-w-2xl text-pretty text-lg">
          Connect with verified students to promote your startup on campus. Pay for results with photo proof of every poster, flyer, and email blast.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="size-5" />
            <span>234 active students</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="size-5" />
            <span>156 universities</span>
          </div>
        </div>
      </div>

      {/* Search Schools */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search universities..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Schools List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Universities</CardTitle>
              <CardDescription>Select a school to view students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {schools.map((school) => (
                <button
                  key={school.id}
                  onClick={() => setSelectedSchool(school)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent ${
                    selectedSchool.id === school.id ? "border-primary bg-accent" : "border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                      {school.logo}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground">{school.name}</p>
                      <p className="text-xs text-muted-foreground">{school.location}</p>
                      <p className="mt-1 text-xs font-medium text-foreground">{school.students} students</p>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Students Grid */}
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-xl font-bold text-foreground">
            Students at {selectedSchool.name}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {students.map((student) => (
              <Card key={student.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start gap-4">
                    <Avatar className="size-16">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="size-4 fill-accent text-accent" />
                        <span className="text-sm font-bold text-foreground">{student.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({student.completedJobs} jobs)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">Verified .edu</Badge>
                    <Badge variant="outline">Top Rated</Badge>
                  </div>

                  <Button 
                    className="w-full gap-2" 
                    onClick={() => handleContactStudent(student)}
                  >
                    <Mail className="size-4" />
                    Contact Student
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Info */}
          <Card className="mt-6 border-accent bg-accent/10">
            <CardHeader>
              <CardTitle className="text-foreground">Simple, Pay-Per-Task Pricing</CardTitle>
              <CardDescription>Only pay for verified results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Poster with photo proof</span>
                <span className="font-bold text-foreground">$5.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Email blast with screenshot</span>
                <span className="font-bold text-foreground">$5.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Social media post</span>
                <span className="font-bold text-foreground">$8.00</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Messaging Panel */}
      {showMessaging && selectedStudent && (
        <MessagingPanel
          isOpen={showMessaging}
          onClose={() => setShowMessaging(false)}
          contactName={selectedStudent.name}
          contactType="student"
        />
      )}
    </div>
  )
}
