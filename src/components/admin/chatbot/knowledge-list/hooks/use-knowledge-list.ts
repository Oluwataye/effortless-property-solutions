
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { KnowledgeItem } from "../../schema/knowledge-form-schema";

export function useKnowledgeList() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isBatchDeleteDialogOpen, setIsBatchDeleteDialogOpen] = useState(false);

  const { data: knowledge, isLoading, refetch } = useQuery({
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

  const { data: categories } = useQuery({
    queryKey: ["chatbot-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chatbot_knowledge")
        .select("category")
        .order("category", { ascending: true });

      if (error) throw error;
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      );
      
      return uniqueCategories;
    },
  });

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      await handleDelete(itemToDelete);
      setItemToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleBatchDeleteConfirm = async () => {
    if (selectedItems.length > 0) {
      const { error } = await supabase
        .from("chatbot_knowledge")
        .delete()
        .in("id", selectedItems);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete selected knowledge entries",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `${selectedItems.length} knowledge entries deleted successfully`,
        });
        setSelectedItems([]);
        refetch();
      }
      setIsBatchDeleteDialogOpen(false);
    }
  };

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

  const handleSelectAll = (checked: boolean) => {
    if (checked && filteredKnowledge) {
      setSelectedItems(filteredKnowledge.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  const exportKnowledge = () => {
    if (!knowledge) return;
    
    const dataToExport = selectedItems.length > 0
      ? knowledge.filter((item) => selectedItems.includes(item.id))
      : knowledge;
    
    const jsonData = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chatbot-knowledge.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: `${dataToExport.length} knowledge entries exported successfully`,
    });
  };

  const filteredKnowledge = knowledge
    ? knowledge.filter((item) => {
        const matchesSearch =
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
        
        return matchesSearch && matchesCategory;
      })
    : [];

  return {
    knowledge,
    filteredKnowledge,
    isLoading,
    refetch,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedItems,
    setSelectedItems,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    itemToDelete,
    setItemToDelete,
    isBatchDeleteDialogOpen,
    setIsBatchDeleteDialogOpen,
    handleDeleteConfirm,
    handleBatchDeleteConfirm,
    handleDelete,
    handleSelectAll,
    handleSelectItem,
    exportKnowledge,
  };
}
