"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StartupView } from "@/components/startup-view"
import { StudentView } from "@/components/student-view"
import { PostTaskStartup } from "@/components/post-task-startup"
import { BrowseTasksStudent } from "@/components/browse-tasks-student"
import { Building2, GraduationCap, Plus, Search } from 'lucide-react'

type ViewType = "startup" | "student"
type PageType = "browse" | "post-task" | "browse-tasks"

export default function Home() {
  const [view, setView] = useState<ViewType>("startup")
  const [page, setPage] = useState<PageType>("browse")

  const renderContent = () => {
    if (view === "startup") {
      if (page === "post-task") return <PostTaskStartup />
      return <StartupView />
    } else {
      if (page === "browse-tasks") return <BrowseTasksStudent />
      return <StudentView />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage("browse")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
                <span className="font-mono text-lg font-bold text-primary-foreground">S2S</span>
              </div>
              <div>
                <h1 className="text-lg font-bold leading-none text-foreground">Startup2Student</h1>
                <p className="text-xs text-muted-foreground">Connect. Advertise. Earn.</p>
              </div>
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 rounded-lg bg-muted p-1">
            <Button
              variant={view === "startup" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setView("startup")
                setPage("browse")
              }}
              className="gap-2"
            >
              <Building2 className="size-4" />
              <span className="hidden sm:inline">For Startups</span>
            </Button>
            <Button
              variant={view === "student" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setView("student")
                setPage("browse")
              }}
              className="gap-2"
            >
              <GraduationCap className="size-4" />
              <span className="hidden sm:inline">For Students</span>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {view === "startup" && (
              <Button 
                variant={page === "post-task" ? "default" : "outline"} 
                size="sm"
                onClick={() => setPage(page === "post-task" ? "browse" : "post-task")}
                className="gap-2"
              >
                {page === "post-task" ? (
                  <>
                    <Search className="size-4" />
                    <span className="hidden sm:inline">Browse Students</span>
                  </>
                ) : (
                  <>
                    <Plus className="size-4" />
                    <span className="hidden sm:inline">Post Task</span>
                  </>
                )}
              </Button>
            )}
            {view === "student" && (
              <Button 
                variant={page === "browse-tasks" ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(page === "browse-tasks" ? "browse" : "browse-tasks")}
                className="gap-2"
              >
                {page === "browse-tasks" ? (
                  <>
                    <Search className="size-4" />
                    <span className="hidden sm:inline">Browse Startups</span>
                  </>
                ) : (
                  <>
                    <Search className="size-4" />
                    <span className="hidden sm:inline">Browse Tasks</span>
                  </>
                )}
              </Button>
            )}
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {renderContent()}
    </div>
  )
}
