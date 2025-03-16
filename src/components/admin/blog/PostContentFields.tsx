
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/admin/blog/MarkdownPreview";
import { Control, UseFormGetValues } from "react-hook-form";

interface PostContentFieldsProps {
  control: Control<any>;
  getValues: UseFormGetValues<any>;
}

const PostContentFields = ({ control, getValues }: PostContentFieldsProps) => {
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

      <MarkdownPreview content={getValues("content")} />
    </div>
  );
};

export default PostContentFields;
