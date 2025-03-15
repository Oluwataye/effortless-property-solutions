
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import BlogPostList from "@/components/admin/blog/BlogPostList";
import SearchAndFilter from "@/components/admin/blog/SearchAndFilter";
import DeleteConfirmationDialog from "@/components/admin/blog/DeleteConfirmationDialog";
import PostFormDialog from "@/components/admin/blog/PostFormDialog";
import PostViewDialog from "@/components/admin/blog/PostViewDialog";

const BlogPosts = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  const {
    posts,
    totalPages,
    currentPage,
    searchQuery,
    statusFilter,
    refetch,
    handleDelete,
    handlePageChange,
    handleSearch,
    setSearchQuery,
    handleStatusFilterChange,
  } = useBlogPosts();

  const handleEdit = (post: any) => {
    setSelectedPost(post);
    setIsEditDialogOpen(true);
  };

  const handleView = (post: any) => {
    setSelectedPost(post);
    setIsViewDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    // Find the post to display its title in the confirmation dialog
    const postToDelete = posts.find(post => post.id === id);
    setSelectedPost(postToDelete);
    setIsDeleteDialogOpen(true);
  };

  const executeDelete = async () => {
    if (selectedPost) {
      const success = await handleDelete(selectedPost.id);
      if (success) {
        setIsDeleteDialogOpen(false);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <PostFormDialog
            isOpen={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            onSuccess={refetch}
            isEditing={false}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Post
              </Button>
            </DialogTrigger>
          </PostFormDialog>
        </div>

        <Card>
          <CardContent className="pt-6">
            <SearchAndFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearch={handleSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={handleStatusFilterChange}
            />

            <BlogPostList
              posts={posts}
              onDelete={confirmDelete}
              onEdit={handleEdit}
              onView={handleView}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <PostFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        post={selectedPost}
        onSuccess={refetch}
        isEditing={true}
      />

      {/* View Dialog */}
      <PostViewDialog
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        post={selectedPost}
        onEdit={() => {
          setIsViewDialogOpen(false);
          handleEdit(selectedPost);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        postTitle={selectedPost?.title}
        onConfirm={executeDelete}
      />
    </AdminLayout>
  );
};

export default BlogPosts;
