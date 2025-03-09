import React, { useEffect } from "react";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
    },
  });

  const { data: categories } = useQuery({
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
      );
      
      return uniqueCategories;
    },
  });

  const { data: knowledgeItem, isLoading: isLoadingKnowledgeItem } = useQuery({
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
      
      return data;
    },
    enabled: !!knowledgeId,
  });

  useEffect(() => {
    if (knowledgeItem) {
      form.reset({
        question: knowledgeItem.question,
        answer: knowledgeItem.answer,
        category: knowledgeItem.category,
      });
    }
  }, [knowledgeItem, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const operation = knowledgeId
        ? supabase
            .from("chatbot_knowledge")
            .update({
              question: data.question,
              answer: data.answer,
              category: data.category,
              updated_at: new Date().toISOString(),
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

  if (knowledgeId && isLoadingKnowledgeItem) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormDescription>
                Enter a customer question that the chatbot should be able to answer
              </FormDescription>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="E.g., What are your business hours?"
                />
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
              <FormDescription>
                Provide a clear, concise answer to the question
              </FormDescription>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="E.g., Our business hours are Monday to Friday from 9am to 5pm, and Saturday from 10am to 2pm. We are closed on Sundays."
                  className="min-h-[120px]"
                />
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
              <FormDescription>
                Select or create a category for this knowledge entry
              </FormDescription>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or create a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Option to create a new category if input doesn't match existing ones */}
                  <SelectItem value={field.value || ""}>
                    {field.value ? field.value : "Create new category"}
                  </SelectItem>
                  
                  {/* Existing categories */}
                  {categories?.filter(category => category !== field.value).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Allow for custom category input if "Create new category" is selected */}
              {!categories?.includes(field.value) && (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter a new category name"
                  className="mt-2"
                />
              )}
              
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {knowledgeId ? "Update" : "Create"} Knowledge Entry
        </Button>
      </form>
    </Form>
  );
};

export default ChatbotKnowledgeForm;
