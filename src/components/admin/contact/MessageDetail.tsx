
import { format } from "date-fns";
import { Mail, Trash, Reply, User, Calendar, Phone } from "lucide-react";
import { ContactMessage } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageDetailProps {
  selectedMessage: ContactMessage | null;
  onDelete: (id: string) => void;
}

const MessageDetail = ({ selectedMessage, onDelete }: MessageDetailProps) => {
  if (!selectedMessage) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-[400px] text-center p-6">
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
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{selectedMessage.subject || "No subject"}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <User className="h-4 w-4 mr-1" />
              <p>
                From {selectedMessage.name} ({selectedMessage.email})
              </p>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <p>
                {format(new Date(selectedMessage.created_at), "MMMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
            {selectedMessage.phone && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Phone className="h-4 w-4 mr-1" />
                <p>{selectedMessage.phone}</p>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(selectedMessage.id)}
              title="Delete message"
            >
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
            <Button variant="ghost" size="icon" asChild title="Reply to email">
              <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`}>
                <Reply className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="pt-6">
          <div className="whitespace-pre-wrap">{selectedMessage.message}</div>
        </CardContent>
      </ScrollArea>
      <CardFooter className="border-t pt-4 pb-4">
        <div className="w-full flex justify-end">
          <Button asChild>
            <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`}>
              Reply via Email
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MessageDetail;
