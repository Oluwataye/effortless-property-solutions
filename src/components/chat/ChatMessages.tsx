
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User } from "lucide-react"

interface Message {
  content: string
  sender_type: 'user' | 'bot' | 'agent'
  created_at?: string
}

interface ChatMessagesProps {
  messages: Message[]
  messagesEndRef: React.RefObject<HTMLDivElement>
}

const ChatMessages = ({ messages, messagesEndRef }: ChatMessagesProps) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender_type !== 'user' && (
              <div className="flex-shrink-0 mr-2">
                <Bot className="h-6 w-6 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender_type === 'user'
                  ? 'bg-primary text-primary-foreground ml-2'
                  : 'bg-muted'
              }`}
            >
              {msg.content}
            </div>
            {msg.sender_type === 'user' && (
              <div className="flex-shrink-0 ml-2">
                <User className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  )
}

export default ChatMessages
