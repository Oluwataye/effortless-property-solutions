
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ChatbotKnowledgeList from "@/components/admin/chatbot/ChatbotKnowledgeList";
import ChatbotKnowledgeForm from "@/components/admin/chatbot/ChatbotKnowledgeForm";
import ChatbotSettings from "@/components/admin/chatbot/ChatbotSettings";
import ChatbotTester from "@/components/admin/chatbot/ChatbotTester";
import ChatbotConversations from "@/components/admin/chatbot/ChatbotConversations";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChatbotPage = () => {
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<string | undefined>();
  const [isCreating, setIsCreating] = useState(false);

  const handleSuccess = () => {
    setSelectedKnowledgeId(undefined);
    setIsCreating(false);
  };

  const handleCancelForm = () => {
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
              <Button 
                onClick={() => {
                  setIsCreating(true);
                  setSelectedKnowledgeId(undefined);
                }}
                disabled={isCreating || !!selectedKnowledgeId}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Knowledge
              </Button>
            </div>

            {(isCreating || selectedKnowledgeId) && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold">
                    {selectedKnowledgeId ? "Edit" : "Add"} Knowledge Entry
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleCancelForm}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-4">
                  <ChatbotKnowledgeForm
                    knowledgeId={selectedKnowledgeId}
                    onSuccess={handleSuccess}
                  />
                </CardContent>
              </Card>
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
