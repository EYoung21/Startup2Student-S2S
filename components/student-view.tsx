"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessagingPanel } from "@/components/messaging-panel"
import { Search, Briefcase, DollarSign, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react'

const startups = [
  {
    id: 1,
    name: "TechFlow AI",
    industry: "Artificial Intelligence",
    description: "AI-powered productivity tools for students and professionals",
    budget: "$500/month",
    tasksAvailable: 12,
    logo: "TF",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "EcoCart",
    industry: "E-commerce",
    description: "Sustainable shopping marketplace with carbon-neutral delivery",
    budget: "$750/month",
    tasksAvailable: 8,
    logo: "EC",
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "StudyBuddy",
    industry: "EdTech",
    description: "Collaborative learning platform connecting students worldwide",
    budget: "$400/month",
    tasksAvailable: 15,
    logo: "SB",
    color: "bg-purple-500"
  },
  {
    id: 4,
    name: "HealthHub",
    industry: "Healthcare",
    description: "Mental health and wellness app for college students",
    budget: "$600/month",
    tasksAvailable: 10,
    logo: "HH",
    color: "bg-red-500"
  },
]

export function StudentView() {
  const [showMessaging, setShowMessaging] = useState(false)
  const [selectedStartup, setSelectedStartup] = useState<typeof startups[0] | null>(null)

  const handleApply = (startup: typeof startups[0]) => {
    setSelectedStartup(startup)
    setShowMessaging(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-8 rounded-xl bg-accent p-8 text-accent-foreground">
        <h2 className="mb-2 text-balance text-3xl font-bold">Earn Money Advertising for Startups on Campus</h2>
        <p className="mb-6 max-w-2xl text-pretty text-lg">
          Verify your .edu email and start earning $5 per task. Put up posters, send emails, share on social media—get paid for every verified action.
        </p>
        <Button size="lg" variant="secondary">
          Verify Your .edu Email
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent">
              <DollarSign className="size-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$145</p>
              <p className="text-sm text-muted-foreground">Your Earnings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent">
              <CheckCircle2 className="size-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">29</p>
              <p className="text-sm text-muted-foreground">Completed Tasks</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent">
              <Briefcase className="size-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4.8</p>
              <p className="text-sm text-muted-foreground">Your Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search startups by name or industry..." className="pl-10" />
        </div>
      </div>

      {/* Available Startups */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Available Opportunities</h3>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>

        <div className="grid gap-4">
          {startups.map((startup) => (
            <Card key={startup.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {/* Logo */}
                  <div className={`flex size-16 shrink-0 items-center justify-center rounded-lg ${startup.color} text-xl font-bold text-white`}>
                    {startup.logo}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold text-foreground">{startup.name}</h4>
                        <p className="text-sm text-muted-foreground">{startup.industry}</p>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <DollarSign className="size-3" />
                        {startup.budget}
                      </Badge>
                    </div>

                    <p className="mb-4 text-sm text-foreground">{startup.description}</p>

                    <div className="mb-4 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase className="size-4" />
                        <span>{startup.tasksAvailable} tasks available</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="size-4" />
                        <span>Posted 2 days ago</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => handleApply(startup)}>
                        Apply Now
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <MessageSquare className="size-4" />
                        Message
                      </Button>
                      <Button variant="ghost">View Details</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <Card className="mt-8 border-accent bg-accent/10">
        <CardHeader>
          <CardTitle className="text-foreground">How It Works</CardTitle>
          <CardDescription>Start earning in 3 simple steps</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              1
            </div>
            <div>
              <p className="font-semibold text-foreground">Choose a Startup</p>
              <p className="text-sm text-muted-foreground">Browse opportunities and apply to startups you're interested in</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              2
            </div>
            <div>
              <p className="font-semibold text-foreground">Complete Tasks</p>
              <p className="text-sm text-muted-foreground">Put up posters, send emails, or share on social media</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              3
            </div>
            <div>
              <p className="font-semibold text-foreground">Get Paid</p>
              <p className="text-sm text-muted-foreground">Submit photo proof and receive payment instantly</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messaging Panel */}
      {showMessaging && selectedStartup && (
        <MessagingPanel
          isOpen={showMessaging}
          onClose={() => setShowMessaging(false)}
          contactName={selectedStartup.name}
          contactType="startup"
        />
      )}
    </div>
  )
}
