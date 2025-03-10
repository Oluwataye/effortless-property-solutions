
import { KnowledgeItem } from "../schema/knowledge-form-schema";

export interface KnowledgeListProps {
  onEdit: (id: string) => void;
}

export interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
}

export interface KnowledgeTableProps {
  knowledge: KnowledgeItem[];
  isLoading: boolean;
  selectedItems: string[];
  onSelectItem: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface KnowledgeSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories?: string[];
  onRefresh: () => void;
  selectedItems: string[];
  onExport: () => void;
  onBatchDelete: () => void;
}
