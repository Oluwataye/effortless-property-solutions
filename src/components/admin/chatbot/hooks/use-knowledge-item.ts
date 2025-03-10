
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { KnowledgeItem } from "../schema/knowledge-form-schema";

export function useKnowledgeItem(knowledgeId?: string) {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["chatbot-knowledge-item", knowledgeId],
    queryFn: async () => {
      if (!knowledgeId) return null;

      const { data, error } = await supabase
        .from("chatbot_knowledge")
        .select("*")
        .eq("id", knowledgeId)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load knowledge entry",
          variant: "destructive",
        });
        throw error;
      }
      
      return data as KnowledgeItem;
    },
    enabled: !!knowledgeId,
  });
}
