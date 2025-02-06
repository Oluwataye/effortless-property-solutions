import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ChatbotKnowledgeList from "@/components/admin/chatbot/ChatbotKnowledgeList";
import ChatbotKnowledgeForm from "@/components/admin/chatbot/ChatbotKnowledgeForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
          <h1 className="text-3xl font-bold">Chatbot Knowledge Base</h1>
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
      </div>
    </AdminLayout>
  );
};

export default ChatbotPage;