
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/admin/blog/MarkdownPreview";
import { Control, UseFormGetValues, useWatch } from "react-hook-form";
import { useState, useEffect } from "react";

interface PostContentFieldsProps {
  control: Control<any>;
  getValues: UseFormGetValues<any>;
}

const PostContentFields = ({ control, getValues }: PostContentFieldsProps) => {
  const [content, setContent] = useState(getValues("content") || "");
  
  // Use the useWatch hook from react-hook-form instead of accessing _subjects directly
  const watchedContent = useWatch({
    control,
    name: "content",
    defaultValue: getValues("content") || ""
  });

  // Update preview when content changes
  useEffect(() => {
    if (watchedContent !== undefined) {
      setContent(watchedContent);
    }
  }, [watchedContent]);

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Write your blog post content here... (Markdown supported)"
                className="min-h-[200px]"
                {...field}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <MarkdownPreview content={content} />
    </div>
  );
};

export default PostContentFields;
