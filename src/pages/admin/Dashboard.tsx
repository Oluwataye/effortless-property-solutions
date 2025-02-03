import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, MessageSquare, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    properties: 0,
    inquiries: 0,
    blogPosts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch properties count
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      // Fetch inquiries count
      const { count: inquiriesCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      // Fetch blog posts count
      const { count: blogPostsCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true });

      setStats({
        properties: propertiesCount || 0,
        inquiries: inquiriesCount || 0,
        blogPosts: blogPostsCount || 0
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
      });
    }
  };

  const dashboardItems = [
    {
      title: "Properties",
      value: stats.properties,
      icon: Building2,
      link: "/admin/properties"
    },
    {
      title: "Inquiries",
      value: stats.inquiries,
      icon: MessageSquare,
      link: "/admin/inquiries"
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      link: "/admin/blog"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item) => (
            <Card 
              key={item.title}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(item.link)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;