
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import { MessageSquare, ChevronRight, RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  user_id: string | null;
  message_count: number;
}

interface Message {
  id: string;
  conversation_id: string;
  content: string;
  sender_type: string;
  created_at: string;
}

const ChatbotConversations = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const { data: conversations, isLoading, refetch } = useQuery({
    queryKey: ["chatbot-conversations"],
    queryFn: async () => {
      // First get all conversations
      const { data: conversationsData, error: conversationsError } = await supabase
        .from("chat_conversations")
        .select("*")
        .order("updated_at", { ascending: false });

      if (conversationsError) throw conversationsError;

      // For each conversation, count the messages
      const conversationsWithCount = await Promise.all(
        (conversationsData || []).map(async (conversation) => {
          const { count, error: countError } = await supabase
            .from("chat_messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conversation.id);

          if (countError) throw countError;

          return {
            ...conversation,
            message_count: count || 0,
          };
        })
      );

      return conversationsWithCount;
    },
  });

  const { data: messages = [], refetch: refetchMessages } = useQuery({
    queryKey: ["chatbot-messages", selectedConversation],
    queryFn: async () => {
      if (!selectedConversation) return [];

      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", selectedConversation)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedConversation,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const formatRelativeTime = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Conversation History</CardTitle>
            <CardDescription>View and analyze past customer conversations</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">Loading conversations...</p>
            </div>
          ) : conversations && conversations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversations.map((conversation) => (
                  <TableRow key={conversation.id}>
                    <TableCell className="font-mono text-xs">{conversation.id.substring(0, 8)}...</TableCell>
                    <TableCell>{formatRelativeTime(conversation.created_at)}</TableCell>
                    <TableCell>{formatRelativeTime(conversation.updated_at)}</TableCell>
                    <TableCell>{conversation.message_count}</TableCell>
                    <TableCell>
                      <Badge variant={conversation.status === "active" ? "default" : "secondary"}>
                        {conversation.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">No conversations found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog 
        open={selectedConversation !== null} 
        onOpenChange={(open) => {
          if (!open) setSelectedConversation(null);
        }}
      >
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Conversation Detail</DialogTitle>
            <DialogDescription>
              Conversation ID: {selectedConversation}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-grow mt-4">
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender_type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender_type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {formatDate(message.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatbotConversations;
