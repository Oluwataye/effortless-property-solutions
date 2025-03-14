import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Home,
  Building2,
  MessageSquare,
  FileText,
  Users,
  Settings,
  Image,
  Layout,
  Star,
  Newspaper,
  FolderOpen,
  Phone,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Building2, label: "Properties", path: "/admin/properties" },
  { icon: MessageSquare, label: "Inquiries", path: "/admin/inquiries" },
  { icon: FileText, label: "Blog Posts", path: "/admin/blog-posts" },
  { icon: Star, label: "Testimonials", path: "/admin/testimonials" },
  { icon: Newspaper, label: "News", path: "/admin/news" },
  { icon: Layout, label: "Services", path: "/admin/services" },
  { icon: FolderOpen, label: "Projects", path: "/admin/projects" },
  { icon: Bot, label: "Chatbot", path: "/admin/chatbot" },
  { icon: Phone, label: "Contact", path: "/admin/contact" },
  { icon: Image, label: "Media", path: "/admin/media" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      toast({
        title: "Access Denied",
        description: "Please login to access the admin dashboard",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/admin/login");
      toast({
        title: "Success",
        description: "Successfully signed out",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors",
                      location.pathname === item.path && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <div className="text-sm breadcrumbs text-gray-500">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="text-primary">
              {sidebarItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
