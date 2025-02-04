import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MessageSquare, FileText, Star } from "lucide-react";

interface DashboardStats {
  properties: number;
  inquiries: number;
  blogPosts: number;
  testimonials: number;
}

interface StatisticsCardsProps {
  stats: DashboardStats;
}

const StatisticsCards = ({ stats }: StatisticsCardsProps) => {
  const navigate = useNavigate();
  
  const statCards = [
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
    <div>
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
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
  );
};

export default StatisticsCards;