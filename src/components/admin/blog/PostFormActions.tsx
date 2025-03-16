
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
  showPreview = false
}: PostFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        <XCircle className="mr-2 h-4 w-4" />
        Cancel
      </Button>
      
      {onPreview && (
        <Button 
          type="button" 
          variant={showPreview ? "default" : "secondary"} 
          onClick={onPreview}
        >
          <Eye className="mr-2 h-4 w-4" />
          {showPreview ? "Hide Preview" : "Show Preview"}
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
