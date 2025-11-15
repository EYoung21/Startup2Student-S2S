"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Megaphone, Mail, Instagram, Calendar, Users, DollarSign, Search, Clock, MapPin, Briefcase, CheckCircle2 } from 'lucide-react'

const availableTasks = [
  {
    id: 1,
    startup: "Notion",
    logo: "N",
    color: "bg-black",
    title: "Spring Semester Campus Ambassador Program",
    type: "poster",
    typeName: "Poster Campaign",
    icon: Megaphone,
    description: "Put up posters around high-traffic areas promoting Notion for student productivity. Target libraries, study spaces, and computer labs.",
    pay: 5,
    quantity: 30,
    claimed: 18,
    schools: ["Haverford College", "Swarthmore College", "Bryn Mawr College"],
    deadline: "Feb 28, 2025",
    postedAgo: "2 hours ago"
  },
  {
    id: 2,
    startup: "Grammarly",
    logo: "G",
    color: "bg-green-600",
    title: "Writing Center Flyer Distribution",
    type: "flyer",
    typeName: "Flyer Distribution",
    icon: Megaphone,
    description: "Hand out Grammarly flyers to students entering the library or writing center. Include discount codes for premium.",
    pay: 4,
    quantity: 50,
    claimed: 22,
    schools: ["Harvard University", "Yale University", "Princeton University"],
    deadline: "Feb 26, 2025",
    postedAgo: "3 hours ago"
  },
  {
    id: 3,
    startup: "Figma",
    logo: "F",
    color: "bg-purple-600",
    title: "Design Student Social Media Campaign",
    type: "social-post",
    typeName: "Social Media Post",
    icon: Instagram,
    description: "Create an Instagram or TikTok post showcasing how you use Figma for design projects. Tag @figma and show your creative process.",
    pay: 8,
    quantity: 20,
    claimed: 12,
    schools: ["Stanford University", "RISD", "Parsons School of Design"],
    deadline: "Feb 25, 2025",
    postedAgo: "1 day ago"
  },
  {
    id: 4,
    startup: "Stripe",
    logo: "S",
    color: "bg-purple-700",
    title: "CS Department Partnership Outreach",
    type: "dept-email",
    typeName: "Department Outreach",
    icon: Mail,
    description: "Email CS department chairs and entrepreneurship professors about Stripe sponsoring hackathons or workshops. We'll provide template.",
    pay: 10,
    quantity: 15,
    claimed: 7,
    schools: ["MIT", "Stanford University", "Carnegie Mellon"],
    deadline: "Mar 5, 2025",
    postedAgo: "2 days ago"
  },
  {
    id: 5,
    startup: "Grammarly",
    logo: "G",
    color: "bg-green-600",
    title: "Writing Center Partnership Event",
    type: "info-table",
    typeName: "Info Table Setup",
    icon: Users,
    description: "Set up an info table for 2 hours near the writing center or library. Hand out flyers about Grammarly Premium for students and answer questions.",
    pay: 25,
    quantity: 8,
    claimed: 3,
    schools: ["University of Pennsylvania", "Harvard University", "Yale University"],
    deadline: "Mar 5, 2025",
    postedAgo: "3 days ago"
  },
  {
    id: 6,
    startup: "Discord",
    logo: "D",
    color: "bg-indigo-600",
    title: "Campus Ambassador - Haverford College",
    type: "ambassador",
    typeName: "Campus Ambassador",
    icon: Users,
    description: "Become Discord's official campus rep at Haverford. Manage all marketing, host events, build partnerships with student orgs. Monthly commitment.",
    pay: 200,
    quantity: 1,
    claimed: 0,
    schools: ["Haverford College"],
    deadline: "Feb 20, 2025",
    postedAgo: "1 week ago"
  },
  {
    id: 7,
    startup: "Notion",
    logo: "N",
    color: "bg-black",
    title: "Student Social Media Manager - Penn",
    type: "social-manager",
    typeName: "Social Media Manager",
    icon: Instagram,
    description: "Manage Notion's social media presence at Penn. Create posts, stories, and engage with student community. 5-10 hours/week commitment.",
    pay: 150,
    quantity: 1,
    claimed: 0,
    schools: ["University of Pennsylvania"],
    deadline: "Feb 22, 2025",
    postedAgo: "5 days ago"
  },
  {
    id: 8,
    startup: "Calm",
    logo: "C",
    color: "bg-sky-400",
    title: "Mental Health Awareness Week Sponsorship",
    type: "event",
    typeName: "Campus Event",
    icon: Calendar,
    description: "Organize a mindfulness and meditation event during finals week. Partner with student wellness groups, set up guided meditation sessions, and promote Calm's student discount.",
    pay: 50,
    quantity: 10,
    claimed: 4,
    schools: ["Duke University", "Northwestern University", "Cornell University"],
    deadline: "Mar 15, 2025",
    postedAgo: "5 days ago"
  },
  {
    id: 9,
    startup: "Discord",
    logo: "D",
    color: "bg-indigo-600",
    title: "Student Organization Email Outreach",
    type: "email",
    typeName: "Email Blast",
    icon: Mail,
    description: "Send an email to student clubs and organizations about using Discord for group communication. We'll provide email template and setup guide.",
    pay: 5,
    quantity: 35,
    claimed: 22,
    schools: ["MIT", "Carnegie Mellon", "Georgia Tech"],
    deadline: "Feb 27, 2025",
    postedAgo: "1 week ago"
  },
  {
    id: 10,
    startup: "Spotify",
    logo: "S",
    color: "bg-green-500",
    title: "Student Premium Instagram Story",
    type: "story",
    typeName: "Instagram Story",
    icon: Instagram,
    description: "Post an Instagram story about Spotify Student Premium discount. Share your favorite study playlist and use our branded stickers.",
    pay: 6,
    quantity: 40,
    claimed: 28,
    schools: ["USC", "NYU", "Boston University"],
    deadline: "Feb 26, 2025",
    postedAgo: "4 days ago"
  },
  {
    id: 11,
    startup: "Duolingo",
    logo: "D",
    color: "bg-green-400",
    title: "Foreign Language Department Posters",
    type: "poster",
    typeName: "Poster Campaign",
    icon: Megaphone,
    description: "Place Duolingo posters in language department buildings, international student centers, and study abroad offices.",
    pay: 5,
    quantity: 25,
    claimed: 15,
    schools: ["UC Berkeley", "UCLA", "University of Texas"],
    deadline: "Mar 1, 2025",
    postedAgo: "2 days ago"
  },
  {
    id: 12,
    startup: "Canva",
    logo: "C",
    color: "bg-cyan-500",
    title: "Student Organization Design Workshop",
    type: "event",
    typeName: "Campus Event",
    icon: Calendar,
    description: "Host a Canva design workshop for student clubs creating posters and social media content. We'll provide workshop materials and swag.",
    pay: 50,
    quantity: 6,
    claimed: 2,
    schools: ["Columbia University", "University of Michigan", "UNC Chapel Hill"],
    deadline: "Mar 10, 2025",
    postedAgo: "1 week ago"
  },
  {
    id: 13,
    startup: "Chegg",
    logo: "C",
    color: "bg-orange-600",
    title: "Exam Season Textbook Campaign",
    type: "poster",
    typeName: "Poster Campaign",
    icon: Megaphone,
    description: "Put up posters about Chegg textbook rentals and study help during midterms. Target academic buildings and bookstores.",
    pay: 5,
    quantity: 30,
    claimed: 20,
    schools: ["University of Florida", "Ohio State", "Penn State"],
    deadline: "Mar 3, 2025",
    postedAgo: "6 days ago"
  },
  {
    id: 14,
    startup: "Stripe",
    logo: "S",
    color: "bg-purple-700",
    title: "Student Entrepreneur Email Campaign",
    type: "email",
    typeName: "Email Blast",
    icon: Mail,
    description: "Send email to entrepreneurship clubs and CS students about building with Stripe. Include info about Stripe Atlas for student startups.",
    pay: 5,
    quantity: 20,
    claimed: 11,
    schools: ["Stanford University", "MIT", "UC Berkeley"],
    deadline: "Feb 29, 2025",
    postedAgo: "3 days ago"
  },
  {
    id: 15,
    startup: "Instacart",
    logo: "I",
    color: "bg-green-600",
    title: "Finals Week Delivery Promotion",
    type: "social-post",
    typeName: "Social Media Post",
    icon: Instagram,
    description: "Create a TikTok or Instagram post about using Instacart during finals week. Show convenience of grocery delivery when you're busy studying.",
    pay: 8,
    quantity: 25,
    claimed: 14,
    schools: ["University of Washington", "Arizona State", "Rutgers"],
    deadline: "Mar 8, 2025",
    postedAgo: "5 days ago"
  },
  {
    id: 16,
    startup: "Quizlet",
    logo: "Q",
    color: "bg-purple-600",
    title: "Study Group Ambassador Program",
    type: "info-table",
    typeName: "Info Table Setup",
    icon: Users,
    description: "Set up info table showcasing Quizlet Plus during exam prep season. Demonstrate flashcard features and practice test tools.",
    pay: 25,
    quantity: 12,
    claimed: 7,
    schools: ["Brown University", "Dartmouth College", "Rice University"],
    deadline: "Mar 7, 2025",
    postedAgo: "1 week ago"
  },
]

export function BrowseTasksStudent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [appliedTasks, setAppliedTasks] = useState<number[]>([])

  const filteredTasks = availableTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.startup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filterType === "all" || task.type === filterType
    
    return matchesSearch && matchesType
  })

  const handleApply = (taskId: number) => {
    setAppliedTasks([...appliedTasks, taskId])
    // Simulate application
    setTimeout(() => {
      // Remove from applied state after showing confirmation
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-balance text-3xl font-bold text-foreground">Available Advertising Tasks</h2>
        <p className="text-pretty text-muted-foreground mt-2">
          Browse campaigns, apply to tasks, and start earning
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search tasks, startups, or keywords..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Task Types</SelectItem>
            <SelectItem value="poster">Posters</SelectItem>
            <SelectItem value="flyer">Flyers</SelectItem>
            <SelectItem value="email">Email Blasts</SelectItem>
            <SelectItem value="dept-email">Department Outreach</SelectItem>
            <SelectItem value="social-post">Social Posts</SelectItem>
            <SelectItem value="story">Stories</SelectItem>
            <SelectItem value="ambassador">Campus Ambassador</SelectItem>
            <SelectItem value="social-manager">Social Media Manager</SelectItem>
            <SelectItem value="event">Events</SelectItem>
            <SelectItem value="info-table">Info Tables</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Grid */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const Icon = task.icon
          const available = task.quantity - task.claimed
          const isApplied = appliedTasks.includes(task.id)
          
          return (
            <Card key={task.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row">
                  {/* Left: Startup Info */}
                  <div className="flex items-start gap-4">
                    <div className={`flex size-16 shrink-0 items-center justify-center rounded-lg ${task.color} text-xl font-bold text-white`}>
                      {task.logo}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">{task.startup}</p>
                      <h3 className="text-lg font-bold text-foreground">{task.title}</h3>
                    </div>
                  </div>

                  {/* Right: Pay Badge */}
                  <div className="lg:ml-auto">
                    <Badge variant="default" className="gap-1 text-base">
                      <DollarSign className="size-4" />
                      {task.pay}.00
                    </Badge>
                  </div>
                </div>

                {/* Task Type & Description */}
                <div className="mt-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{task.typeName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>

                {/* Meta Info */}
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Briefcase className="size-4" />
                    <span>{available} of {task.quantity} available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span>Due {task.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    <span>{task.schools.length} schools</span>
                  </div>
                </div>

                {/* Schools */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {task.schools.slice(0, 3).map((school) => (
                    <Badge key={school} variant="secondary" className="text-xs">
                      {school}
                    </Badge>
                  ))}
                  {task.schools.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{task.schools.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button 
                    onClick={() => handleApply(task.id)}
                    disabled={isApplied}
                    className="flex-1 sm:flex-none"
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="mr-2 size-4" />
                        Applied!
                      </>
                    ) : (
                      "Apply to Task"
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="size-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No tasks found</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Try adjusting your search or filters to find available advertising tasks
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
