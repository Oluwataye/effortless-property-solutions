
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import MediaSelector from "@/components/admin/media/MediaSelector";

interface BlogPostFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const BlogPostForm = ({ onSuccess, onCancel }: BlogPostFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft",
    featured_image: "",
    tags: [] as string[],
  });

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData({ ...formData, tags });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("blog_posts").insert([
        {
          ...formData,
          author_id: user?.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post added successfully",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        required
      />
      <Textarea
        placeholder="Content"
        value={formData.content}
        onChange={(e) =>
          setFormData({ ...formData, content: e.target.value })
        }
        required
        className="min-h-[200px]"
      />
      <Input
        placeholder="Tags (comma-separated)"
        onChange={handleTagsChange}
      />
      <Select
        value={formData.status}
        onValueChange={(value) =>
          setFormData({ ...formData, status: value })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </SelectContent>
      </Select>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Featured Image
        </label>
        <MediaSelector 
          value={formData.featured_image}
          onChange={(url) => setFormData({ ...formData, featured_image: url })}
          fieldName="blog_featured_image"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Post</Button>
      </div>
    </form>
  );
};

export default BlogPostForm;
