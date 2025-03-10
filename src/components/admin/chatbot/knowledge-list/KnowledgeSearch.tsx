
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  RefreshCw, 
  Filter,
  MoreHorizontal,
  Download,
  Trash
} from "lucide-react";
import { KnowledgeSearchProps } from "./types";

export const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  onRefresh,
  selectedItems,
  onExport,
  onBatchDelete
}) => {
  return (
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
        
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export {selectedItems.length > 0 ? `(${selectedItems.length})` : "All"}
            </DropdownMenuItem>
            {selectedItems.length > 0 && (
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={onBatchDelete}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Selected ({selectedItems.length})
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
