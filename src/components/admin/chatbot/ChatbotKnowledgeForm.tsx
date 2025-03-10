
import React from "react";
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
import { Loader2 } from "lucide-react";
import { useKnowledgeItem } from "./hooks/use-knowledge-item";
import { useKnowledgeForm } from "./hooks/use-knowledge-form";
import { CategorySelector } from "./components/CategorySelector";

interface ChatbotKnowledgeFormProps {
  knowledgeId?: string;
  onSuccess: () => void;
}

const ChatbotKnowledgeForm = ({
  knowledgeId,
  onSuccess,
}: ChatbotKnowledgeFormProps) => {
  const { data: knowledgeItem, isLoading: isLoadingKnowledgeItem } = useKnowledgeItem(knowledgeId);
  
  const {
    form,
    customCategory,
    setCustomCategory,
    isSubmitting,
    handleCategorySelect,
    onSubmit
  } = useKnowledgeForm({
    knowledgeId,
    knowledgeItem,
    onSuccess
  });

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

        <CategorySelector
          form={form}
          customCategory={customCategory}
          setCustomCategory={setCustomCategory}
          handleCategorySelect={handleCategorySelect}
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
