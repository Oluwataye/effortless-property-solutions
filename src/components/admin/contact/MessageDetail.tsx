
import { format } from "date-fns";
import { Mail, Trash } from "lucide-react";
import { ContactMessage } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MessageDetailProps {
  selectedMessage: ContactMessage | null;
  onDelete: (id: string) => void;
}

const MessageDetail = ({ selectedMessage, onDelete }: MessageDetailProps) => {
  if (!selectedMessage) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
          <Mail className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No message selected</h3>
          <p className="text-muted-foreground">
            Select a message from the list to view its details
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{selectedMessage.subject || "No subject"}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              From {selectedMessage.name} ({selectedMessage.email})
              {selectedMessage.phone && ` • ${selectedMessage.phone}`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Received {format(new Date(selectedMessage.created_at), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(selectedMessage.id)}
            >
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={`mailto:${selectedMessage.email}`}>
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="whitespace-pre-wrap">{selectedMessage.message}</div>
      </CardContent>
    </Card>
  );
};

export default MessageDetail;
