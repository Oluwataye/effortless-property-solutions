import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

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
      const validMessages = data.map(msg => ({
        content: msg.content,
        sender_type: validateSenderType(msg.sender_type),
        created_at: msg.created_at
      }))
      setMessages(validMessages)
    }
  }

  const validateSenderType = (type: string): 'user' | 'bot' | 'agent' => {
    if (type === 'user' || type === 'bot' || type === 'agent') {
      return type
    }
    return 'bot'
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

    const newUserMessage: Message = { content: userMessage, sender_type: 'user' }
    setMessages(prev => [...prev, newUserMessage])

    try {
      const { error: messageError } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: conversationId,
          content: userMessage,
          sender_type: 'user'
        }])

      if (messageError) throw messageError

      const response = await supabase.functions.invoke('chat', {
        body: { message: userMessage, conversationId }
      })

      if (response.error) throw response.error

      const botMessage: Message = { content: response.data.response, sender_type: 'bot' }
      setMessages(prev => [...prev, botMessage])

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
      setMessages(prev => prev.filter(msg => msg !== newUserMessage))
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 p-0"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background rounded-lg shadow-xl w-96 h-[500px] flex flex-col border">
        <ChatHeader onClose={() => setIsOpen(false)} />
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInput
          message={message}
          isLoading={isLoading}
          onMessageChange={(e) => setMessage(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default ChatWidget