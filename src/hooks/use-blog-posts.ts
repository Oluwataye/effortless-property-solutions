
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  tags: string[];
  created_at: string;
  featured_image: string | null;
}

interface UseBlogPostsProps {
  initialPage?: number;
  initialPostsPerPage?: number;
  initialSearchQuery?: string;
  initialStatusFilter?: string | null;
}

export const useBlogPosts = ({
  initialPage = 1,
  initialPostsPerPage = 5,
  initialSearchQuery = "",
  initialStatusFilter = null,
}: UseBlogPostsProps = {}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [postsPerPage] = useState(initialPostsPerPage);
  const [statusFilter, setStatusFilter] = useState<string | null>(initialStatusFilter);

  // Load blog posts with search, pagination and filter
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["blog-posts", searchQuery, currentPage, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("*", { count: "exact" });
      
      // Apply search filter if provided
      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }
      
      // Apply status filter if provided
      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }
      
      // Calculate pagination
      const from = (currentPage - 1) * postsPerPage;
      const to = from + postsPerPage - 1;
      
      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      
      return { 
        posts: data || [],
        totalCount: count || 0
      };
    },
  });

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / postsPerPage) : 0;

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .match({ id });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      
      refetch();
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    refetch();
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value === "all" ? null : value);
    setCurrentPage(1);
  };

  return {
    posts: data?.posts || [],
    totalPages,
    currentPage,
    searchQuery,
    statusFilter,
    isLoading,
    refetch,
    handleDelete,
    handlePageChange,
    handleSearch,
    setSearchQuery,
    handleStatusFilterChange,
  };
};
