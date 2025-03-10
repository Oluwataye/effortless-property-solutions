
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Mail, Trash, Search } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  phone?: string;
  created_at: string;
  read: boolean;
};

const Contact = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

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

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // Mark as read if not already
    if (!message.read) {
      try {
        const { error } = await supabase
          .from("contact_messages")
          .update({ read: true })
          .eq("id", message.id);
          
        if (error) throw error;
        
        // Update local state
        setMessages(messages.map(msg => 
          msg.id === message.id ? { ...msg, read: true } : msg
        ));
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    }
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", messageToDelete);
        
      if (error) throw error;
      
      // Update the local state
      setMessages(messages.filter(msg => msg.id !== messageToDelete));
      
      // Close the dialog
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
      
      // If the deleted message was selected, clear the selection
      if (selectedMessage && selectedMessage.id === messageToDelete) {
        setSelectedMessage(null);
      }
      
      toast({
        title: "Message deleted",
        description: "The message has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete the message",
        variant: "destructive",
      });
    }
  };

  const confirmDeleteMessage = (id: string) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center py-4 text-muted-foreground">Loading messages...</p>
                ) : filteredMessages.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">No messages found</p>
                ) : (
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedMessage?.id === message.id
                            ? "bg-primary/10"
                            : "hover:bg-muted"
                        } ${!message.read ? "border-l-4 border-primary" : ""}`}
                        onClick={() => handleViewMessage(message)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium truncate">{message.name}</h3>
                          {!message.read && (
                            <Badge variant="default" className="ml-2">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{message.subject || "No subject"}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {format(new Date(message.created_at), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedMessage.subject || "No subject"}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        From {selectedMessage.name} ({selectedMessage.email})
                        {selectedMessage.phone && ` • ${selectedMessage.phone}`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Received {format(new Date(selectedMessage.created_at), "MMMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDeleteMessage(selectedMessage.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`mailto:${selectedMessage.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="whitespace-pre-wrap">{selectedMessage.message}</div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
                  <Mail className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No message selected</h3>
                  <p className="text-muted-foreground">
                    Select a message from the list to view its details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMessage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Contact;
