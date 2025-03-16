
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { blogPostsService, BlogPost } from "@/services/blog-posts-service";

// Define validation schema
const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  status: z.string().default("draft"),
  featured_image: z.string().nullable(),
  tags: z.array(z.string())
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;

interface UseBlogPostFormProps {
  post?: BlogPost;
  onSuccess: () => void;
}

export const useBlogPostForm = ({ post, onSuccess }: UseBlogPostFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagsInput, setTagsInput] = useState(post?.tags?.join(", ") || "");

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "draft",
      featured_image: post?.featured_image || null,
      tags: post?.tags || [],
    },
  });

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const tagsArray = value.split(",").map((tag) => tag.trim()).filter(Boolean);
    form.setValue("tags", tagsArray);
  };

  const handleSubmit = async (values: BlogPostFormValues) => {
    try {
      setIsSubmitting(true);
      
      if (post?.id) {
        await blogPostsService.updateBlogPost(post.id, values as BlogPost);
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        await blogPostsService.createBlogPost(values as BlogPost);
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    tagsInput,
    handleTagsChange,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};
