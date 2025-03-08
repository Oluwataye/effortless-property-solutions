
import React from 'react'
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatHeaderProps {
  onClose: () => void
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground">
      <div className="font-semibold">Customer Support</div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose}
        className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default ChatHeader
