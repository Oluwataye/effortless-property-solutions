
import React, { useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"

interface ChatInputProps {
  message: string
  isLoading: boolean
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

const ChatInput = ({ message, isLoading, onMessageChange, onSubmit }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Focus the input when component mounts
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  
  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && message.trim()) {
      e.preventDefault()
      onSubmit(e)
    }
  }
  
  return (
    <form onSubmit={onSubmit} className="p-4 border-t flex gap-2">
      <Input
        ref={inputRef}
        value={message}
        onChange={onMessageChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !message.trim()} size="icon" className="bg-primary hover:bg-primary/90">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  )
}

export default ChatInput
