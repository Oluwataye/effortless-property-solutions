import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  content: string
  sender_type: 'user' | 'bot' | 'agent'
  created_at?: string
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen && !conversationId) {
      createNewConversation()
    }
  }, [isOpen])

  useEffect(() => {
    if (conversationId) {
      loadExistingMessages()
    }
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadExistingMessages = async () => {
    if (!conversationId) return

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      })
      return
    }

    if (data) {
      // Type guard to ensure sender_type is valid
      const validMessages = data.map(msg => ({
        content: msg.content,
        sender_type: validateSenderType(msg.sender_type),
        created_at: msg.created_at
      }))
      setMessages(validMessages)
    }
  }

  // Helper function to validate sender_type
  const validateSenderType = (type: string): 'user' | 'bot' | 'agent' => {
    if (type === 'user' || type === 'bot' || type === 'agent') {
      return type
    }
    return 'bot' // Default fallback
  }

  const createNewConversation = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert([{ user_id: session?.user?.id || null }])
      .select()
      .single()

    if (error) {
      toast({
        title: "Error",
        description: "Failed to start conversation",
        variant: "destructive",
      })
      return
    }

    if (data) {
      setConversationId(data.id)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !conversationId || isLoading) return

    setIsLoading(true)
    const userMessage = message.trim()
    setMessage('')

    // Optimistically add user message
    const newUserMessage: Message = { content: userMessage, sender_type: 'user' }
    setMessages(prev => [...prev, newUserMessage])

    try {
      // Store user message in database
      const { error: messageError } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: conversationId,
          content: userMessage,
          sender_type: 'user'
        }])

      if (messageError) throw messageError

      // Get AI response
      const response = await supabase.functions.invoke('chat', {
        body: { message: userMessage, conversationId }
      })

      if (response.error) throw response.error

      const botMessage: Message = { content: response.data.response, sender_type: 'bot' }
      setMessages(prev => [...prev, botMessage])

      // Store bot message in database
      await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: conversationId,
          content: response.data.response,
          sender_type: 'bot'
        }])

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
      // Remove the optimistically added message on error
      setMessages(prev => prev.filter(msg => msg !== newUserMessage))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 p-0"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <div className="bg-background rounded-lg shadow-xl w-96 h-[500px] flex flex-col border">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender_type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} size="icon">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ChatWidget