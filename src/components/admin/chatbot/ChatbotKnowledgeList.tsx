import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatbotKnowledgeListProps {
  onEdit: (id: string) => void;
}

const ChatbotKnowledgeList = ({ onEdit }: ChatbotKnowledgeListProps) => {
  const { toast } = useToast();

  const { data: knowledge, refetch } = useQuery({
    queryKey: ["chatbot-knowledge"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chatbot_knowledge")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("chatbot_knowledge")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete knowledge entry",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Knowledge entry deleted successfully",
      });
      refetch();
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {knowledge?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.question}</TableCell>
              <TableCell>{item.answer}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ChatbotKnowledgeList;