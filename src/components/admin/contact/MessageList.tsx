
import { format } from "date-fns";
import { ContactMessage } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MessageListProps {
  messages: ContactMessage[];
  selectedMessageId: string | null;
  isLoading: boolean;
  onSelectMessage: (message: ContactMessage) => void;
}

const MessageList = ({ 
  messages, 
  selectedMessageId, 
  isLoading, 
  onSelectMessage 
}: MessageListProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center py-4 text-muted-foreground">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No messages found</p>
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedMessageId === message.id
                    ? "bg-primary/10"
                    : "hover:bg-muted"
                } ${!message.read ? "border-l-4 border-primary" : ""}`}
                onClick={() => onSelectMessage(message)}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium truncate">{message.name}</h3>
                  {!message.read && (
                    <Badge variant="default" className="ml-2">New</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{message.subject || "No subject"}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {format(new Date(message.created_at), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageList;
