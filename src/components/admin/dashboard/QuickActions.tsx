
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2, FileText, Star, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const QuickActions = () => {
  const navigate = useNavigate();
  
  const quickActions = [
    {
      title: "Add Property",
      icon: Building2,
      path: "/admin/properties",
      color: "text-blue-500",
    },
    {
      title: "Add Blog Post",
      icon: FileText,
      path: "/admin/blog-posts",
      color: "text-green-500",
    },
    {
      title: "Add Testimonial",
      icon: Star,
      path: "/admin/testimonials",
      color: "text-yellow-500",
    },
    {
      title: "Add News",
      icon: Newspaper,
      path: "/admin/news",
      color: "text-purple-500",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => navigate(action.path)}
          >
            <action.icon className={cn("h-6 w-6", action.color)} />
            <span>{action.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
