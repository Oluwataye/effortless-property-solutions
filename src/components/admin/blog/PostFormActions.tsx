
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PostFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  isEditing: boolean;
}

const PostFormActions = ({ isSubmitting, onCancel, isEditing }: PostFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEditing ? "Update" : "Create"} Post
      </Button>
    </div>
  );
};

export default PostFormActions;
