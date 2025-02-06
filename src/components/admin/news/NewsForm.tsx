import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
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
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/utils/uploadUtils";

interface NewsFormData {
  title: string;
  content: string;
  category: string;
  featured_image?: FileList;
  status: "draft" | "published";
  publish_date?: string;
}

interface NewsFormProps {
  newsId?: string;
  onSuccess: () => void;
}

const NewsForm = ({ newsId, onSuccess }: NewsFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<NewsFormData>();

  const onSubmit = async (data: NewsFormData) => {
    try {
      setIsLoading(true);
      let imageUrl = undefined;

      if (data.featured_image?.[0]) {
        imageUrl = await uploadImage(data.featured_image[0], "blog_images");
      }

      const newsData = {
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status,
        publish_date: data.publish_date,
        ...(imageUrl && { featured_image: imageUrl }),
      };

      if (newsId) {
        const { error } = await supabase
          .from("news")
          .update(newsData)
          .eq("id", newsId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert([newsData]);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `News article ${newsId ? "updated" : "created"} successfully`,
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${newsId ? "update" : "create"} news article`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Title"
          {...register("title", { required: true })}
        />
      </div>

      <div>
        <Select
          onValueChange={(value) => setValue("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company">Company News</SelectItem>
            <SelectItem value="industry">Industry Updates</SelectItem>
            <SelectItem value="property">Property News</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Textarea
          placeholder="Content"
          {...register("content", { required: true })}
          rows={6}
        />
      </div>

      <div>
        <Input
          type="file"
          accept="image/*"
          {...register("featured_image")}
        />
      </div>

      <div>
        <Select
          onValueChange={(value) => setValue("status", value as "draft" | "published")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          type="datetime-local"
          {...register("publish_date")}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : (newsId ? "Update" : "Create")} News Article
      </Button>
    </form>
  );
};

export default NewsForm;