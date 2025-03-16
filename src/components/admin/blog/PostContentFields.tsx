
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Control, UseFormGetValues } from "react-hook-form";

interface PostContentFieldsProps {
  control: Control<any>;
  getValues: UseFormGetValues<any>;
}

const PostContentFields = ({ control, getValues }: PostContentFieldsProps) => {
  const previewContent = () => {
    return { __html: getValues("content") };
  };

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
  );
};

export default PostContentFields;
