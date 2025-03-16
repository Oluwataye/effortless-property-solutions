
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MediaSelector from "@/components/admin/media/MediaSelector";
import { Control } from "react-hook-form";

interface PostMetadataFieldsProps {
  control: Control<any>;
  tagsInput: string;
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostMetadataFields = ({ control, tagsInput, handleTagsChange }: PostMetadataFieldsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
  );
};

export default PostMetadataFields;
