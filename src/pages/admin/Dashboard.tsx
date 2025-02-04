import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import StatisticsCards from "@/components/admin/dashboard/StatisticsCards";
import RecentActivity from "@/components/admin/dashboard/RecentActivity";

const Dashboard = () => {
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

  return (
    <AdminLayout>
      <div className="space-y-8">
        <DashboardHeader />
        <QuickActions />
        <StatisticsCards stats={stats} />
        <RecentActivity activities={stats.recentActivities} />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;