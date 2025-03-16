
import { Form } from "@/components/ui/form";
import PostMetadataFields from "@/components/admin/blog/PostMetadataFields";
import PostContentFields from "@/components/admin/blog/PostContentFields";
import PostFormActions from "@/components/admin/blog/PostFormActions";
import { useBlogPostForm } from "@/hooks/use-blog-post-form";
import MarkdownPreview from "@/components/admin/blog/MarkdownPreview";

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
  const { 
    form, 
    isSubmitting, 
    tagsInput, 
    showPreview,
    handleTagsChange, 
    togglePreview,
    handleSubmit 
  } = useBlogPostForm({
    post,
    onSuccess,
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`grid gap-6 ${showPreview ? "grid-cols-1" : "md:grid-cols-2"}`}>
          {showPreview ? (
            <>
              <PostMetadataFields 
                control={form.control}
                tagsInput={tagsInput}
                handleTagsChange={handleTagsChange}
              />
              <MarkdownPreview 
                content={form.getValues("content")} 
                expanded={true}
              />
            </>
          ) : (
            <>
              <PostMetadataFields 
                control={form.control}
                tagsInput={tagsInput}
                handleTagsChange={handleTagsChange}
              />
              <PostContentFields 
                control={form.control}
                getValues={form.getValues}
              />
            </>
          )}
        </div>

        <PostFormActions 
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          isEditing={!!post?.id}
          onPreview={togglePreview}
          showPreview={showPreview}
        />
      </form>
    </Form>
  );
};

export default BlogPostForm;
