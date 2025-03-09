
import React, { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Pencil, 
  Trash2, 
  Search, 
  RefreshCw, 
  Filter,
  MoreHorizontal,
  Download,
  Upload,
  Trash
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatbotKnowledgeListProps {
  onEdit: (id: string) => void;
}

const ChatbotKnowledgeList = ({ onEdit }: ChatbotKnowledgeListProps) => {
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

  return (
    <div className="rounded-md border">
      <div className="bg-white p-4 border-b flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge base..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {selectedCategory && (
            <Badge className="gap-1" variant="secondary">
              {selectedCategory}
              <button
                onClick={() => setSelectedCategory(null)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </Badge>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories?.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportKnowledge}>
                <Download className="h-4 w-4 mr-2" />
                Export {selectedItems.length > 0 ? `(${selectedItems.length})` : "All"}
              </DropdownMenuItem>
              {selectedItems.length > 0 && (
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={() => setIsBatchDeleteDialogOpen(true)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedItems.length})
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  filteredKnowledge.length > 0 && 
                  selectedItems.length === filteredKnowledge.length
                }
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Loading knowledge entries...</p>
              </TableCell>
            </TableRow>
          ) : filteredKnowledge.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <p className="text-muted-foreground">No knowledge entries found</p>
              </TableCell>
            </TableRow>
          ) : (
            filteredKnowledge.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => 
                      handleSelectItem(item.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{item.question}</TableCell>
                <TableCell>{item.answer.length > 100 ? `${item.answer.substring(0, 100)}...` : item.answer}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
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
                      onClick={() => {
                        setItemToDelete(item.id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              knowledge entry from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isBatchDeleteDialogOpen}
        onOpenChange={setIsBatchDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Items</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedItems.length} knowledge entries? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleBatchDeleteConfirm}>
              Delete {selectedItems.length} items
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChatbotKnowledgeList;
