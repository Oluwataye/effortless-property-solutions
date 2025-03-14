
import { useState, useEffect } from "react";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import MediaSelector from "@/components/admin/media/MediaSelector";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface BlogPostFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  post?: {
    id: string;
    title: string;
    content: string;
    status: string;
    featured_image: string | null;
    tags: string[];
  };
}

const BlogPostForm = ({ onSuccess, onCancel, post }: BlogPostFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagsInput, setTagsInput] = useState(post?.tags?.join(", ") || "");

  const form = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "draft",
      featured_image: post?.featured_image || "",
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
        status: post.status,
        featured_image: post.featured_image || "",
      });
      setTagsInput(post.tags?.join(", ") || "");
    }
  }, [post, form]);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const parseTags = (tagsString: string): string[] => {
    return tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const formData = {
        ...values,
        tags: parseTags(tagsInput),
        author_id: user?.id,
      };

      let result;
      
      if (post?.id) {
        // Update existing post
        result = await supabase
          .from("blog_posts")
          .update(formData)
          .eq("id", post.id);
      } else {
        // Create new post
        result = await supabase
          .from("blog_posts")
          .insert([formData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: post?.id 
          ? "Blog post updated successfully" 
          : "Blog post created successfully",
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewContent = () => {
    return { __html: form.getValues("content") };
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter tags (comma-separated)"
                  value={tagsInput}
                  onChange={handleTagsChange}
                />
              </FormControl>
              <FormDescription>
                Separate tags with commas (e.g. news, announcement, update)
              </FormDescription>
            </FormItem>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <MediaSelector
                      value={field.value}
                      onChange={field.onChange}
                      fieldName="blog_featured_image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post content here..."
                      className="min-h-[200px]"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-semibold mb-2">Content Preview</h3>
                <div 
                  className="prose prose-sm max-w-none overflow-auto max-h-[200px] p-4 bg-gray-50 rounded border"
                  dangerouslySetInnerHTML={previewContent()} 
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {post?.id ? "Update" : "Create"} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogPostForm;
