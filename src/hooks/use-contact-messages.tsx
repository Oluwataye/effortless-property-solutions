
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContactMessage } from "@/types/contact";

export function useContactMessages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data as ContactMessage[]);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      toast({
        title: "Error",
        description: "Could not load contact messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ read: true })
        .eq("id", messageId);
        
      if (error) throw error;
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", messageId);
        
      if (error) throw error;
      
      // Update the local state
      setMessages(messages.filter(msg => msg.id !== messageId));
      
      toast({
        title: "Message deleted",
        description: "The message has been successfully deleted.",
      });
      
      return true;
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete the message",
        variant: "destructive",
      });
      return false;
    }
  };

  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    messages: filteredMessages,
    isLoading,
    searchQuery,
    setSearchQuery,
    markAsRead,
    deleteMessage,
    refreshMessages: fetchMessages
  };
}
