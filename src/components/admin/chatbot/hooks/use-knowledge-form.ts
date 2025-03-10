
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { KnowledgeFormData, knowledgeFormSchema } from "../schema/knowledge-form-schema";

interface UseKnowledgeFormProps {
  knowledgeId?: string;
  knowledgeItem?: any;
  onSuccess: () => void;
}

export function useKnowledgeForm({ knowledgeId, knowledgeItem, onSuccess }: UseKnowledgeFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const queryClient = useQueryClient();
  
  const form = useForm<KnowledgeFormData>({
    resolver: zodResolver(knowledgeFormSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
    },
  });

  useEffect(() => {
    if (knowledgeItem) {
      form.reset({
        question: knowledgeItem.question,
        answer: knowledgeItem.answer,
        category: knowledgeItem.category,
      });
      setCustomCategory(knowledgeItem.category);
    }
  }, [knowledgeItem, form]);

  const handleCategorySelect = (value: string) => {
    if (value === "new") {
      form.setValue("category", customCategory);
    } else {
      form.setValue("category", value);
      setCustomCategory("");
    }
  };

  const onSubmit = async (data: KnowledgeFormData) => {
    setIsSubmitting(true);
    
    try {
      // Use the custom category if it's set
      const finalCategory = customCategory || data.category;
      
      const operation = knowledgeId
        ? supabase
            .from("chatbot_knowledge")
            .update({
              question: data.question,
              answer: data.answer,
              category: finalCategory,
              updated_at: new Date().toISOString(),
            })
            .eq("id", knowledgeId)
        : supabase.from("chatbot_knowledge").insert({
            question: data.question,
            answer: data.answer,
            category: finalCategory,
          });

      const { error } = await operation;

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save knowledge entry",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Knowledge entry saved successfully",
        });
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ["chatbot-knowledge"] });
        queryClient.invalidateQueries({ queryKey: ["chatbot-categories"] });
        
        onSuccess();
        form.reset({
          question: "",
          answer: "",
          category: "",
        });
        setCustomCategory("");
      }
    } catch (error) {
      console.error("Error saving knowledge entry:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    customCategory,
    setCustomCategory,
    isSubmitting,
    handleCategorySelect,
    onSubmit,
  };
}
