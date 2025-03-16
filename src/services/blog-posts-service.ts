
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  status: string;
  featured_image: string | null;
  tags: string[];
  created_at?: string;
  updated_at?: string;
  author_id?: string;
}

export const blogPostsService = {
  async getBlogPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }

    return data || [];
  },

  async getBlogPostById(id: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) {
      console.error("Error fetching blog post:", error);
      throw error;
    }

    return data;
  },

  async createBlogPost(post: BlogPost) {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([{
        ...post,
        author_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single();
    
    if (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }

    return data;
  },

  async updateBlogPost(id: string, post: BlogPost) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        ...post,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating blog post:", error);
      throw error;
    }

    return data;
  },

  async deleteBlogPost(id: string) {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);
    
    if (error) {
      console.error("Error deleting blog post:", error);
      throw error;
    }

    return true;
  }
};
