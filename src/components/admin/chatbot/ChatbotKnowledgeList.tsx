
import React from "react";
import { KnowledgeTable } from "./knowledge-list/KnowledgeTable";
import { KnowledgeSearch } from "./knowledge-list/KnowledgeSearch";
import { DeleteDialog } from "./knowledge-list/DeleteDialog";
import { useKnowledgeList } from "./knowledge-list/hooks/use-knowledge-list";
import { KnowledgeListProps } from "./knowledge-list/types";

const ChatbotKnowledgeList = ({ onEdit }: KnowledgeListProps) => {
  const {
    filteredKnowledge,
    isLoading,
    refetch,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedItems,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    itemToDelete,
    setItemToDelete,
    isBatchDeleteDialogOpen,
    setIsBatchDeleteDialogOpen,
    handleDeleteConfirm,
    handleBatchDeleteConfirm,
    handleSelectAll,
    handleSelectItem,
    exportKnowledge,
  } = useKnowledgeList();

  return (
    <div className="rounded-md border">
      <KnowledgeSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        onRefresh={() => refetch()}
        selectedItems={selectedItems}
        onExport={exportKnowledge}
        onBatchDelete={() => setIsBatchDeleteDialogOpen(true)}
      />

      <KnowledgeTable
        knowledge={filteredKnowledge}
        isLoading={isLoading}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        onEdit={onEdit}
        onDelete={(id) => {
          setItemToDelete(id);
          setIsDeleteDialogOpen(true);
        }}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the knowledge entry from the database."
        confirmLabel="Delete"
      />

      <DeleteDialog
        isOpen={isBatchDeleteDialogOpen}
        onOpenChange={setIsBatchDeleteDialogOpen}
        onConfirm={handleBatchDeleteConfirm}
        title="Delete Multiple Items"
        description={`Are you sure you want to delete ${selectedItems.length} knowledge entries? This action cannot be undone.`}
        confirmLabel={`Delete ${selectedItems.length} items`}
      />
    </div>
  );
};

export default ChatbotKnowledgeList;
