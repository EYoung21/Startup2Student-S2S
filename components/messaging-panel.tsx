"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X, Send, Paperclip, ImageIcon } from 'lucide-react'

interface Message {
  id: number
  sender: "me" | "them"
  content: string
  timestamp: string
}

interface MessagingPanelProps {
  isOpen: boolean
  onClose: () => void
  contactName: string
  contactType: "student" | "startup"
}

export function MessagingPanel({ isOpen, onClose, contactName, contactType }: MessagingPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "them",
      content: `Hi! I'm interested in working together. Can you tell me more about the opportunity?`,
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      sender: "me",
      content: "Of course! We're looking for students to help promote our app on campus.",
      timestamp: "10:32 AM"
    }
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSend = () => {
    if (!newMessage.trim()) return
    
    setMessages([...messages, {
      id: messages.length + 1,
      sender: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setNewMessage("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 p-4 backdrop-blur-sm sm:items-center sm:justify-center">
      <Card className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{contactName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{contactName}</CardTitle>
              <CardDescription className="text-xs">
                {contactType === "student" ? "Student" : "Startup"}
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-96 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`mt-1 text-xs ${
                    message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="shrink-0">
                <Paperclip className="size-4" />
              </Button>
              <Button variant="outline" size="icon" className="shrink-0">
                <ImageIcon className="size-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} className="shrink-0 gap-2">
                <Send className="size-4" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
