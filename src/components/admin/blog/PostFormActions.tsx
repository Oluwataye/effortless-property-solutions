
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Save, XCircle } from "lucide-react";

interface PostFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  isEditing: boolean;
  onPreview?: () => void;
  showPreview?: boolean;
}

const PostFormActions = ({ 
  isSubmitting, 
  onCancel, 
  isEditing, 
  onPreview,
  showPreview = true
}: PostFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        <XCircle className="mr-2 h-4 w-4" />
        Cancel
      </Button>
      
      {showPreview && onPreview && (
        <Button type="button" variant="secondary" onClick={onPreview}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      )}
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Save className="mr-2 h-4 w-4" />
        {isEditing ? "Update" : "Create"} Post
      </Button>
    </div>
  );
};

export default PostFormActions;
