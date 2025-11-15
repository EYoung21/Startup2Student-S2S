"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Megaphone, Mail, Instagram, Calendar, Users, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react'

const taskTypes = [
  {
    id: "poster",
    name: "Poster Campaign",
    icon: Megaphone,
    price: 5,
    description: "Physical posters around campus with photo proof"
  },
  {
    id: "flyer",
    name: "Flyer Distribution",
    icon: Megaphone,
    price: 4,
    description: "Hand out flyers in high-traffic areas with photo proof"
  },
  {
    id: "email",
    name: "Email Blast",
    icon: Mail,
    price: 5,
    description: "Email sent to student groups with screenshot proof"
  },
  {
    id: "dept-email",
    name: "Department Outreach",
    icon: Mail,
    price: 10,
    description: "Email to department chairs or professors for sponsorship"
  },
  {
    id: "social-post",
    name: "Social Media Post",
    icon: Instagram,
    price: 8,
    description: "Instagram, TikTok, or Twitter post"
  },
  {
    id: "story",
    name: "Instagram/TikTok Story",
    icon: Instagram,
    price: 6,
    description: "24-hour story with screenshot proof"
  },
  {
    id: "ambassador",
    name: "Campus Ambassador (Monthly)",
    icon: Users,
    price: 200,
    description: "Dedicated representative managing all campus marketing"
  },
  {
    id: "social-manager",
    name: "Social Media Manager (Monthly)",
    icon: Instagram,
    price: 150,
    description: "Manage startup's social presence at specific school"
  },
  {
    id: "event",
    name: "Campus Event",
    icon: Calendar,
    price: 50,
    description: "Full event organization with photos"
  },
  {
    id: "info-table",
    name: "Info Table Setup",
    icon: Users,
    price: 25,
    description: "2-hour info table at high-traffic location"
  },
]

export function PostTaskStartup() {
  const [selectedType, setSelectedType] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    targetSchools: [] as string[],
    deadline: "",
    budget: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const selectedTaskType = taskTypes.find(t => t.id === selectedType)
  const estimatedCost = selectedTaskType && formData.quantity 
    ? selectedTaskType.price * parseInt(formData.quantity) 
    : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Simulate submission
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-balance text-3xl font-bold text-foreground">Post a New Advertising Task</h2>
        <p className="text-pretty text-muted-foreground mt-2">
          Create a campus advertising campaign and connect with student ambassadors
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Advertising Task Type</CardTitle>
            <CardDescription>Choose what type of campus advertising you need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {taskTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary ${
                      selectedType === type.id 
                        ? "border-primary bg-accent" 
                        : "border-border"
                    }`}
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-foreground">{type.name}</p>
                        <Badge variant="secondary" className="gap-1">
                          <DollarSign className="size-3" />
                          {type.price}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Task Details */}
        {selectedType && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>Provide information about your advertising campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Campaign Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Spring Semester Launch Campaign"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Campaign Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you want promoted, key messages, any specific requirements..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Needed *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      placeholder="How many?"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Number of {selectedTaskType?.name.toLowerCase()}s needed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Target Schools */}
            <Card>
              <CardHeader>
                <CardTitle>Target Universities</CardTitle>
                <CardDescription>Select which schools you want to advertise at</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select universities..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Universities</SelectItem>
                    <SelectItem value="tri-co">Tri-Co Schools Only</SelectItem>
                    <SelectItem value="ivy">Ivy League</SelectItem>
                    <SelectItem value="uc">UC System</SelectItem>
                    <SelectItem value="custom">Custom Selection...</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  You can select specific schools or choose a category
                </p>
              </CardContent>
            </Card>

            {/* Budget Summary */}
            <Card className="border-accent bg-accent/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="size-5" />
                  Budget Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Task Type:</span>
                  <span className="font-medium text-foreground">{selectedTaskType?.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price per task:</span>
                  <span className="font-medium text-foreground">${selectedTaskType?.price}.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium text-foreground">{formData.quantity || "0"}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Estimated Total:</span>
                  <span className="text-2xl font-bold text-foreground">${estimatedCost.toFixed(2)}</span>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-background p-3">
                  <AlertCircle className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    You only pay when students complete tasks and submit verified proof
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-3">
              <Button type="submit" size="lg" className="flex-1" disabled={submitted}>
                {submitted ? (
                  <>
                    <CheckCircle2 className="mr-2 size-5" />
                    Task Posted!
                  </>
                ) : (
                  "Post Campaign"
                )}
              </Button>
              <Button type="button" variant="outline" size="lg">
                Save Draft
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
