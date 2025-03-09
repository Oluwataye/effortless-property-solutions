
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ChatbotKnowledgeList from "@/components/admin/chatbot/ChatbotKnowledgeList";
import ChatbotKnowledgeForm from "@/components/admin/chatbot/ChatbotKnowledgeForm";
import ChatbotSettings from "@/components/admin/chatbot/ChatbotSettings";
import ChatbotTester from "@/components/admin/chatbot/ChatbotTester";
import ChatbotConversations from "@/components/admin/chatbot/ChatbotConversations";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ChatbotPage = () => {
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<string | undefined>();
  const [isCreating, setIsCreating] = useState(false);

  const handleSuccess = () => {
    setSelectedKnowledgeId(undefined);
    setIsCreating(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Chatbot Management</h1>
        </div>

        <Tabs defaultValue="knowledge" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="test">Test Chatbot</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="knowledge" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Knowledge
              </Button>
            </div>

            {(isCreating || selectedKnowledgeId) && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedKnowledgeId ? "Edit" : "Add"} Knowledge Entry
                </h2>
                <ChatbotKnowledgeForm
                  knowledgeId={selectedKnowledgeId}
                  onSuccess={handleSuccess}
                />
              </div>
            )}

            <ChatbotKnowledgeList onEdit={setSelectedKnowledgeId} />
          </TabsContent>
          
          <TabsContent value="settings">
            <ChatbotSettings />
          </TabsContent>
          
          <TabsContent value="test">
            <ChatbotTester />
          </TabsContent>
          
          <TabsContent value="conversations">
            <ChatbotConversations />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ChatbotPage;
