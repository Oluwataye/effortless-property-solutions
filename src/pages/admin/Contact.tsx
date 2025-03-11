
import { useState } from "react";
import { Search } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { useContactMessages } from "@/hooks/use-contact-messages";
import { ContactMessage } from "@/types/contact";
import MessageList from "@/components/admin/contact/MessageList";
import MessageDetail from "@/components/admin/contact/MessageDetail";
import DeleteConfirmationDialog from "@/components/admin/contact/DeleteConfirmationDialog";

const Contact = () => {
  const { 
    messages, 
    isLoading, 
    searchQuery, 
    setSearchQuery, 
    markAsRead,
    deleteMessage 
  } = useContactMessages();
  
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // Mark as read if not already
    if (!message.read) {
      await markAsRead(message.id);
    }
  };

  const confirmDeleteMessage = (id: string) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    
    const success = await deleteMessage(messageToDelete);
    
    if (success) {
      // Close the dialog
      setDeleteDialogOpen(false);
      
      // If the deleted message was selected, clear the selection
      if (selectedMessage && selectedMessage.id === messageToDelete) {
        setSelectedMessage(null);
      }
    }
    
    setMessageToDelete(null);
  };

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
            <MessageList
              messages={messages}
              selectedMessageId={selectedMessage?.id || null}
              isLoading={isLoading}
              onSelectMessage={handleViewMessage}
            />
          </div>

          <div className="md:col-span-2">
            <MessageDetail
              selectedMessage={selectedMessage}
              onDelete={confirmDeleteMessage}
            />
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteMessage}
      />
    </AdminLayout>
  );
};

export default Contact;
