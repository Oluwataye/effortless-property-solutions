import React from 'react'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ChatHeaderProps {
  onClose: () => void
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <h3 className="font-semibold">Chat Support</h3>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default ChatHeader