
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

const MarkdownPreview = ({ content, className = "" }: MarkdownPreviewProps) => {
  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold mb-2">Content Preview</h3>
        <div className="prose prose-sm max-w-none overflow-auto max-h-[200px] p-4 bg-gray-50 rounded border">
          <ReactMarkdown>{content || "Preview will appear here..."}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarkdownPreview;
