
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useChatbotCategories() {
  return useQuery({
    queryKey: ["chatbot-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chatbot_knowledge")
        .select("category")
        .order("category", { ascending: true });

      if (error) throw error;
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      ).filter(Boolean);
      
      return uniqueCategories;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
