
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  featured_image: string | null;
  tags: string[];
}

interface UseBlogPostFormProps {
  post?: BlogPost;
  onSuccess: () => void;
}

export const useBlogPostForm = ({ post, onSuccess }: UseBlogPostFormProps) => {
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

  return {
    form,
    isSubmitting,
    tagsInput,
    handleTagsChange,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};
