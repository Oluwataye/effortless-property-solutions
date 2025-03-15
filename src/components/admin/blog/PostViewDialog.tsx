
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BlogPostView from "@/components/admin/blog/BlogPostView";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  tags: string[];
  created_at: string;
  featured_image: string | null;
}

interface PostViewDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  post?: BlogPost;
  onEdit: () => void;
}

const PostViewDialog = ({
  isOpen,
  onOpenChange,
  post,
  onEdit
}: PostViewDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Blog Post Details</DialogTitle>
        </DialogHeader>
        {post && (
          <BlogPostView
            post={post}
            onEdit={() => {
              onOpenChange(false);
              onEdit();
            }}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostViewDialog;
