import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  MessageSquare,
  FileText,
  Plus,
  Star,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    properties: 0,
    inquiries: 0,
    blogPosts: 0,
    testimonials: 0,
    recentActivities: [],
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

      // Fetch recent activities
      const { data: recentInquiries } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        properties: propertiesCount || 0,
        inquiries: inquiriesCount || 0,
        blogPosts: blogPostsCount || 0,
        testimonials: 0,
        recentActivities: recentInquiries || [],
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
      });
    }
  };

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
      path: "/admin/blog",
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

  const stats = [
    {
      title: "Properties",
      value: stats.properties,
      icon: Building2,
      path: "/admin/properties",
    },
    {
      title: "Inquiries",
      value: stats.inquiries,
      icon: MessageSquare,
      path: "/admin/inquiries",
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      path: "/admin/blog",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: Star,
      path: "/admin/testimonials",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2">Welcome to your admin dashboard</p>
        </div>

        {/* Quick Actions */}
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
        
        {/* Statistics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card
                key={stat.title}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(stat.path)}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {stats.recentActivities.map((activity: any) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-gray-500">
                        New inquiry: {activity.message.substring(0, 50)}...
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;