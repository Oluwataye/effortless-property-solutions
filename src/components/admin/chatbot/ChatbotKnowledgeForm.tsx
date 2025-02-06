import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.string().min(1, "Category is required"),
});

type FormData = z.infer<typeof formSchema>;

interface ChatbotKnowledgeFormProps {
  knowledgeId?: string;
  onSuccess: () => void;
}

const ChatbotKnowledgeForm = ({
  knowledgeId,
  onSuccess,
}: ChatbotKnowledgeFormProps) => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
    },
  });

  useQuery({
    queryKey: ["chatbot-knowledge", knowledgeId],
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
      } else if (data) {
        form.reset({
          question: data.question,
          answer: data.answer,
          category: data.category,
        });
      }

      return data;
    },
    enabled: !!knowledgeId,
  });

  const onSubmit = async (data: FormData) => {
    const operation = knowledgeId
      ? supabase
          .from("chatbot_knowledge")
          .update({
            question: data.question,
            answer: data.answer,
            category: data.category,
          })
          .eq("id", knowledgeId)
      : supabase.from("chatbot_knowledge").insert({
          question: data.question,
          answer: data.answer,
          category: data.category,
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
      onSuccess();
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {knowledgeId ? "Update" : "Create"} Knowledge Entry
        </Button>
      </form>
    </Form>
  );
};

export default ChatbotKnowledgeForm;