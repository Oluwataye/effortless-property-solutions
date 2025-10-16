
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import DOMPurify from 'dompurify';

interface BlogPostViewProps {
  post: {
    id: string;
    title: string;
    content: string;
    status: string;
    tags: string[];
    created_at: string;
    featured_image: string | null;
  };
  onEdit: () => void;
  onClose: () => void;
}

const BlogPostView = ({ post, onEdit, onClose }: BlogPostViewProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span>
              Created: {new Date(post.created_at).toLocaleDateString()}
            </span>
            <Badge variant={post.status === "published" ? "default" : "secondary"}>
              {post.status}
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Post
        </Button>
      </div>

      {post.featured_image && (
        <div className="aspect-video w-full overflow-hidden rounded-md">
          <img 
            src={post.featured_image} 
            alt={post.title} 
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-1 my-4">
        {post.tags?.map((tag, index) => (
          <Badge key={index} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogPostView;
