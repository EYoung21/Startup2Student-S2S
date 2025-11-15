"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StartupView } from "@/components/startup-view"
import { StudentView } from "@/components/student-view"
import { Building2, GraduationCap } from 'lucide-react'

export default function Home() {
  const [view, setView] = useState<"startup" | "student">("startup")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
              <span className="font-mono text-lg font-bold text-primary-foreground">CH</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-foreground">CampusHustle</h1>
              <p className="text-xs text-muted-foreground">Connect. Advertise. Earn.</p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 rounded-lg bg-muted p-1">
            <Button
              variant={view === "startup" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("startup")}
              className="gap-2"
            >
              <Building2 className="size-4" />
              <span className="hidden sm:inline">For Startups</span>
            </Button>
            <Button
              variant={view === "student" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("student")}
              className="gap-2"
            >
              <GraduationCap className="size-4" />
              <span className="hidden sm:inline">For Students</span>
            </Button>
          </div>

          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </header>

      {/* Main Content */}
      {view === "startup" ? <StartupView /> : <StudentView />}
    </div>
  )
}
