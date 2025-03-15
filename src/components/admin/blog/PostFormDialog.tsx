
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BlogPostForm from "@/components/admin/blog/BlogPostForm";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  tags: string[];
  created_at: string;
  featured_image: string | null;
}

interface PostFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  post?: BlogPost;
  onSuccess: () => void;
  isEditing: boolean;
}

const PostFormDialog = ({
  isOpen,
  onOpenChange,
  post,
  onSuccess,
  isEditing
}: PostFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Blog Post" : "Add New Blog Post"}
          </DialogTitle>
        </DialogHeader>
        <BlogPostForm
          post={post}
          onSuccess={() => {
            onOpenChange(false);
            onSuccess();
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PostFormDialog;
