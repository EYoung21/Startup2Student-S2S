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
  // Tri-Co Schools
  { id: 1, name: "Haverford College", location: "Haverford, PA", students: 45, logo: "H" },
  { id: 2, name: "Swarthmore College", location: "Swarthmore, PA", students: 38, logo: "S" },
  { id: 3, name: "Bryn Mawr College", location: "Bryn Mawr, PA", students: 42, logo: "B" },
  
  // Ivy League
  { id: 4, name: "University of Pennsylvania", location: "Philadelphia, PA", students: 156, logo: "P" },
  { id: 5, name: "Harvard University", location: "Cambridge, MA", students: 203, logo: "H" },
  { id: 6, name: "Yale University", location: "New Haven, CT", students: 178, logo: "Y" },
  { id: 7, name: "Princeton University", location: "Princeton, NJ", students: 165, logo: "P" },
  { id: 8, name: "Columbia University", location: "New York, NY", students: 192, logo: "C" },
  { id: 9, name: "Cornell University", location: "Ithaca, NY", students: 187, logo: "C" },
  { id: 10, name: "Brown University", location: "Providence, RI", students: 145, logo: "B" },
  { id: 11, name: "Dartmouth College", location: "Hanover, NH", students: 98, logo: "D" },
  
  // West Coast / Top Tech Schools
  { id: 12, name: "Stanford University", location: "Stanford, CA", students: 234, logo: "S" },
  { id: 13, name: "MIT", location: "Cambridge, MA", students: 198, logo: "M" },
  { id: 14, name: "Caltech", location: "Pasadena, CA", students: 67, logo: "C" },
  
  // UC System
  { id: 15, name: "UC Berkeley", location: "Berkeley, CA", students: 289, logo: "B" },
  { id: 16, name: "UCLA", location: "Los Angeles, CA", students: 312, logo: "U" },
  { id: 17, name: "UC San Diego", location: "San Diego, CA", students: 267, logo: "U" },
  { id: 18, name: "UC Santa Barbara", location: "Santa Barbara, CA", students: 198, logo: "U" },
  { id: 19, name: "UC Irvine", location: "Irvine, CA", students: 223, logo: "U" },
  { id: 20, name: "UC Davis", location: "Davis, CA", students: 201, logo: "U" },
  
  // Big State Schools
  { id: 21, name: "University of Michigan", location: "Ann Arbor, MI", students: 276, logo: "M" },
  { id: 22, name: "University of Texas at Austin", location: "Austin, TX", students: 298, logo: "T" },
  { id: 23, name: "University of Wisconsin", location: "Madison, WI", students: 245, logo: "W" },
  { id: 24, name: "Ohio State University", location: "Columbus, OH", students: 287, logo: "O" },
  { id: 25, name: "Penn State University", location: "State College, PA", students: 265, logo: "P" },
  { id: 26, name: "University of Florida", location: "Gainesville, FL", students: 254, logo: "F" },
  { id: 27, name: "University of Washington", location: "Seattle, WA", students: 241, logo: "W" },
  { id: 28, name: "University of Illinois", location: "Urbana-Champaign, IL", students: 258, logo: "I" },
  { id: 29, name: "University of North Carolina", location: "Chapel Hill, NC", students: 232, logo: "N" },
  { id: 30, name: "Georgia Tech", location: "Atlanta, GA", students: 219, logo: "G" },
  
  // Other Notable Universities
  { id: 31, name: "Duke University", location: "Durham, NC", students: 167, logo: "D" },
  { id: 32, name: "Northwestern University", location: "Evanston, IL", students: 173, logo: "N" },
  { id: 33, name: "University of Chicago", location: "Chicago, IL", students: 156, logo: "U" },
  { id: 34, name: "Vanderbilt University", location: "Nashville, TN", students: 143, logo: "V" },
  { id: 35, name: "Rice University", location: "Houston, TX", students: 121, logo: "R" },
  { id: 36, name: "Carnegie Mellon University", location: "Pittsburgh, PA", students: 189, logo: "C" },
  { id: 37, name: "USC", location: "Los Angeles, CA", students: 245, logo: "U" },
  { id: 38, name: "NYU", location: "New York, NY", students: 267, logo: "N" },
  { id: 39, name: "Boston University", location: "Boston, MA", students: 234, logo: "B" },
  { id: 40, name: "Emory University", location: "Atlanta, GA", students: 138, logo: "E" },
]

const studentsBySchool: Record<string, any[]> = {
  "Haverford College": [
    { id: 1, name: "Alex Martinez", school: "Haverford", rating: 4.9, completedJobs: 47, email: "amartinez@haverford.edu", avatar: "/diverse-female-student.png" },
    { id: 2, name: "Jordan Lee", school: "Haverford", rating: 4.8, completedJobs: 35, email: "jlee@haverford.edu", avatar: "/male-student-studying.png" },
    { id: 3, name: "Taylor Kim", school: "Haverford", rating: 4.95, completedJobs: 62, email: "tkim@haverford.edu", avatar: "/female-student-latina.jpg" },
    { id: 4, name: "Morgan Patel", school: "Haverford", rating: 4.7, completedJobs: 28, email: "mpatel@haverford.edu", avatar: "/male-student-asian.jpg" },
  ],
  "Swarthmore College": [
    { id: 5, name: "Riley Johnson", school: "Swarthmore", rating: 4.85, completedJobs: 41, email: "rjohnson1@swarthmore.edu", avatar: "/male-student-studying.png" },
    { id: 6, name: "Avery Chen", school: "Swarthmore", rating: 4.92, completedJobs: 53, email: "achen2@swarthmore.edu", avatar: "/diverse-female-student.png" },
    { id: 7, name: "Cameron Davis", school: "Swarthmore", rating: 4.78, completedJobs: 39, email: "cdavis1@swarthmore.edu", avatar: "/male-student-asian.jpg" },
    { id: 8, name: "Quinn Rodriguez", school: "Swarthmore", rating: 4.88, completedJobs: 45, email: "qrodriguez1@swarthmore.edu", avatar: "/female-student-latina.jpg" },
  ],
  "Bryn Mawr College": [
    { id: 9, name: "Blake Thompson", school: "Bryn Mawr", rating: 4.91, completedJobs: 56, email: "bthompson@brynmawr.edu", avatar: "/female-student-latina.jpg" },
    { id: 10, name: "Casey Park", school: "Bryn Mawr", rating: 4.83, completedJobs: 44, email: "cpark@brynmawr.edu", avatar: "/male-student-asian.jpg" },
    { id: 11, name: "Reese Williams", school: "Bryn Mawr", rating: 4.87, completedJobs: 49, email: "rwilliams@brynmawr.edu", avatar: "/diverse-female-student.png" },
    { id: 12, name: "Skylar Brown", school: "Bryn Mawr", rating: 4.79, completedJobs: 37, email: "sbrown@brynmawr.edu", avatar: "/male-student-studying.png" },
  ],
  "University of Pennsylvania": [
    { id: 13, name: "Drew Anderson", school: "Penn", rating: 4.93, completedJobs: 68, email: "danderson@upenn.edu", avatar: "/male-student-studying.png" },
    { id: 14, name: "Sage Miller", school: "Penn", rating: 4.89, completedJobs: 52, email: "smiller@upenn.edu", avatar: "/female-student-latina.jpg" },
    { id: 15, name: "River Zhang", school: "Penn", rating: 4.86, completedJobs: 47, email: "rzhang@upenn.edu", avatar: "/diverse-female-student.png" },
    { id: 16, name: "Phoenix Carter", school: "Penn", rating: 4.94, completedJobs: 71, email: "pcarter@upenn.edu", avatar: "/male-student-asian.jpg" },
  ],
  "Harvard University": [
    { id: 17, name: "Sarah Chen", school: "Harvard", rating: 4.96, completedJobs: 84, email: "schen@college.harvard.edu", avatar: "/diverse-female-student.png" },
    { id: 18, name: "Marcus Johnson", school: "Harvard", rating: 4.88, completedJobs: 73, email: "mjohnson@college.harvard.edu", avatar: "/male-student-studying.png" },
    { id: 19, name: "Emma Kowalski", school: "Harvard", rating: 4.91, completedJobs: 79, email: "ekowalski@college.harvard.edu", avatar: "/female-student-latina.jpg" },
    { id: 20, name: "David Liu", school: "Harvard", rating: 4.87, completedJobs: 68, email: "dliu@college.harvard.edu", avatar: "/male-student-asian.jpg" },
  ],
  "Stanford University": [
    { id: 21, name: "Priya Sharma", school: "Stanford", rating: 4.94, completedJobs: 91, email: "psharma@stanford.edu", avatar: "/diverse-female-student.png" },
    { id: 22, name: "Tyler Morrison", school: "Stanford", rating: 4.89, completedJobs: 76, email: "tmorrison@stanford.edu", avatar: "/male-student-studying.png" },
    { id: 23, name: "Luna Martinez", school: "Stanford", rating: 4.92, completedJobs: 83, email: "lmartinez@stanford.edu", avatar: "/female-student-latina.jpg" },
    { id: 24, name: "Kevin Wong", school: "Stanford", rating: 4.85, completedJobs: 69, email: "kwong@stanford.edu", avatar: "/male-student-asian.jpg" },
  ],
  "MIT": [
    { id: 25, name: "Zara Ahmed", school: "MIT", rating: 4.93, completedJobs: 88, email: "zahmed@mit.edu", avatar: "/diverse-female-student.png" },
    { id: 26, name: "Jake Peterson", school: "MIT", rating: 4.87, completedJobs: 72, email: "jpeterson@mit.edu", avatar: "/male-student-studying.png" },
    { id: 27, name: "Sofia Gonzalez", school: "MIT", rating: 4.90, completedJobs: 81, email: "sgonzalez@mit.edu", avatar: "/female-student-latina.jpg" },
    { id: 28, name: "Ryan Nakamura", school: "MIT", rating: 4.86, completedJobs: 74, email: "rnakamura@mit.edu", avatar: "/male-student-asian.jpg" },
  ],
  "UC Berkeley": [
    { id: 29, name: "Maya Patel", school: "UC Berkeley", rating: 4.88, completedJobs: 67, email: "mayapatel@berkeley.edu", avatar: "/diverse-female-student.png" },
    { id: 30, name: "Chris Thompson", school: "UC Berkeley", rating: 4.82, completedJobs: 59, email: "cthompson@berkeley.edu", avatar: "/male-student-studying.png" },
    { id: 31, name: "Isabella Reyes", school: "UC Berkeley", rating: 4.85, completedJobs: 63, email: "ireyes@berkeley.edu", avatar: "/female-student-latina.jpg" },
    { id: 32, name: "Daniel Kim", school: "UC Berkeley", rating: 4.80, completedJobs: 56, email: "dkim@berkeley.edu", avatar: "/male-student-asian.jpg" },
  ],
  "UCLA": [
    { id: 33, name: "Olivia Santos", school: "UCLA", rating: 4.86, completedJobs: 65, email: "osantos@ucla.edu", avatar: "/diverse-female-student.png" },
    { id: 34, name: "Ethan Williams", school: "UCLA", rating: 4.81, completedJobs: 58, email: "ewilliams@ucla.edu", avatar: "/male-student-studying.png" },
    { id: 35, name: "Carmen Lopez", school: "UCLA", rating: 4.84, completedJobs: 61, email: "clopez@ucla.edu", avatar: "/female-student-latina.jpg" },
    { id: 36, name: "Jason Lee", school: "UCLA", rating: 4.79, completedJobs: 54, email: "jlee@ucla.edu", avatar: "/male-student-asian.jpg" },
  ],
  "Yale University": [
    { id: 37, name: "Grace Montgomery", school: "Yale", rating: 4.92, completedJobs: 82, email: "grace.montgomery@yale.edu", avatar: "/diverse-female-student.png" },
    { id: 38, name: "Benjamin Clarke", school: "Yale", rating: 4.87, completedJobs: 75, email: "benjamin.clarke@yale.edu", avatar: "/male-student-studying.png" },
    { id: 39, name: "Valeria Cruz", school: "Yale", rating: 4.89, completedJobs: 78, email: "valeria.cruz@yale.edu", avatar: "/female-student-latina.jpg" },
    { id: 40, name: "Aaron Tanaka", school: "Yale", rating: 4.84, completedJobs: 70, email: "aaron.tanaka@yale.edu", avatar: "/male-student-asian.jpg" },
  ],
  "Princeton University": [
    { id: 41, name: "Chloe Anderson", school: "Princeton", rating: 4.91, completedJobs: 80, email: "canderson@princeton.edu", avatar: "/diverse-female-student.png" },
    { id: 42, name: "Nathan Brooks", school: "Princeton", rating: 4.86, completedJobs: 73, email: "nbrooks@princeton.edu", avatar: "/male-student-studying.png" },
    { id: 43, name: "Diana Ramirez", school: "Princeton", rating: 4.88, completedJobs: 76, email: "dramirez@princeton.edu", avatar: "/female-student-latina.jpg" },
    { id: 44, name: "Eric Chen", school: "Princeton", rating: 4.83, completedJobs: 68, email: "echen@princeton.edu", avatar: "/male-student-asian.jpg" },
  ],
  "Columbia University": [
    { id: 45, name: "Mia Richardson", school: "Columbia", rating: 4.90, completedJobs: 77, email: "mrichardson@columbia.edu", avatar: "/diverse-female-student.png" },
    { id: 46, name: "Lucas Harper", school: "Columbia", rating: 4.85, completedJobs: 71, email: "lharper@columbia.edu", avatar: "/male-student-studying.png" },
    { id: 47, name: "Rosa Morales", school: "Columbia", rating: 4.87, completedJobs: 74, email: "rmorales@columbia.edu", avatar: "/female-student-latina.jpg" },
    { id: 48, name: "Vincent Park", school: "Columbia", rating: 4.82, completedJobs: 66, email: "vpark@columbia.edu", avatar: "/male-student-asian.jpg" },
  ],
  "University of Michigan": [
    { id: 49, name: "Hannah Foster", school: "Michigan", rating: 4.84, completedJobs: 62, email: "hanfoster@umich.edu", avatar: "/diverse-female-student.png" },
    { id: 50, name: "Connor Mitchell", school: "Michigan", rating: 4.79, completedJobs: 55, email: "cmitchell@umich.edu", avatar: "/male-student-studying.png" },
    { id: 51, name: "Lucia Fernandez", school: "Michigan", rating: 4.81, completedJobs: 58, email: "lfernandez@umich.edu", avatar: "/female-student-latina.jpg" },
    { id: 52, name: "Andrew Nguyen", school: "Michigan", rating: 4.77, completedJobs: 52, email: "anguyen@umich.edu", avatar: "/male-student-asian.jpg" },
  ],
  "University of Texas at Austin": [
    { id: 53, name: "Sophia Wright", school: "UT Austin", rating: 4.83, completedJobs: 60, email: "swright@utexas.edu", avatar: "/diverse-female-student.png" },
    { id: 54, name: "Mason Turner", school: "UT Austin", rating: 4.78, completedJobs: 54, email: "mturner@utexas.edu", avatar: "/male-student-studying.png" },
    { id: 55, name: "Gabriela Sanchez", school: "UT Austin", rating: 4.80, completedJobs: 57, email: "gsanchez@utexas.edu", avatar: "/female-student-latina.jpg" },
    { id: 56, name: "Brandon Choi", school: "UT Austin", rating: 4.76, completedJobs: 51, email: "bchoi@utexas.edu", avatar: "/male-student-asian.jpg" },
  ],
  "Duke University": [
    { id: 57, name: "Lily Bennett", school: "Duke", rating: 4.89, completedJobs: 75, email: "lbennett@duke.edu", avatar: "/diverse-female-student.png" },
    { id: 58, name: "Owen Russell", school: "Duke", rating: 4.84, completedJobs: 69, email: "orussell@duke.edu", avatar: "/male-student-studying.png" },
    { id: 59, name: "Camila Torres", school: "Duke", rating: 4.86, completedJobs: 72, email: "ctorres@duke.edu", avatar: "/female-student-latina.jpg" },
    { id: 60, name: "Justin Huang", school: "Duke", rating: 4.81, completedJobs: 64, email: "jhuang@duke.edu", avatar: "/male-student-asian.jpg" },
  ],
  "Carnegie Mellon University": [
    { id: 61, name: "Aria Patel", school: "CMU", rating: 4.91, completedJobs: 81, email: "apatel@andrew.cmu.edu", avatar: "/diverse-female-student.png" },
    { id: 62, name: "Caleb Stevens", school: "CMU", rating: 4.86, completedJobs: 74, email: "cstevens@andrew.cmu.edu", avatar: "/male-student-studying.png" },
    { id: 63, name: "Elena Vargas", school: "CMU", rating: 4.88, completedJobs: 77, email: "evargas@andrew.cmu.edu", avatar: "/female-student-latina.jpg" },
    { id: 64, name: "Michael Zhang", school: "CMU", rating: 4.83, completedJobs: 69, email: "mzhang@andrew.cmu.edu", avatar: "/male-student-asian.jpg" },
  ],
}

const getTotalStudents = () => schools.reduce((sum, school) => sum + school.students, 0)

export function StartupView() {
  const [selectedSchool, setSelectedSchool] = useState(schools[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [showMessaging, setShowMessaging] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentStudents = studentsBySchool[selectedSchool.name] || []

  const handleContactStudent = (student: any) => {
    setSelectedStudent(student)
    setShowMessaging(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-8 rounded-xl bg-accent p-8 text-accent-foreground">
        <h2 className="mb-2 text-balance text-3xl font-bold">Find Student Ambassadors at Top Universities</h2>
        <p className="mb-6 max-w-2xl text-pretty text-lg">
          Connect with verified students to promote your startup on campus. Pay for results with photo proof of every poster, flyer, email blast, social media post, and campus event.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="size-5" />
            <span>{getTotalStudents().toLocaleString()} active students</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="size-5" />
            <span>{schools.length} universities</span>
          </div>
        </div>
      </div>

      {/* Search Schools */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search universities..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Schools List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Universities</CardTitle>
              <CardDescription>
                {filteredSchools.length === schools.length 
                  ? "Select a school to view students"
                  : `${filteredSchools.length} results`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[600px] space-y-2 overflow-y-auto">
              {filteredSchools.map((school) => (
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
                      <p className="text-sm text-muted-foreground">{school.location}</p>
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
            {currentStudents.map((student) => (
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
                <span className="text-foreground">Flyer distribution with proof</span>
                <span className="font-bold text-foreground">$4.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Email blast with screenshot</span>
                <span className="font-bold text-foreground">$5.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Department/professor outreach</span>
                <span className="font-bold text-foreground">$10.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Social media post</span>
                <span className="font-bold text-foreground">$8.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Instagram/TikTok story</span>
                <span className="font-bold text-foreground">$6.00</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-foreground">Campus event organization</span>
                <span className="font-bold text-foreground">$50.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Info table setup (2 hours)</span>
                <span className="font-bold text-foreground">$25.00</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-foreground">Campus Ambassador (monthly)</span>
                <span className="font-bold text-foreground">$200.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Social Media Manager (monthly)</span>
                <span className="font-bold text-foreground">$150.00</span>
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
