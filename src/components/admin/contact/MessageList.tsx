
import { format } from "date-fns";
import { ContactMessage } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Messages</CardTitle>
          <Badge variant="outline">{messages.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <p className="text-center py-4 text-muted-foreground">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No messages found</p>
        ) : (
          <ScrollArea className="h-[600px]">
            <div className="space-y-px">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 cursor-pointer transition-colors ${
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
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageList;
