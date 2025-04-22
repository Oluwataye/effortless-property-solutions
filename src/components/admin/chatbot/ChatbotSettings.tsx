
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  openai_api_key: z.string().optional(),
  perplexity_api_key: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ChatbotSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openai_api_key: "",
      perplexity_api_key: "",
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    try {
      // For each API key that has a value, update the secret
      if (data.openai_api_key && data.openai_api_key.trim() !== "") {
        const { error: openaiError } = await supabase.functions.invoke("update-secret", {
          body: {
            name: "OPENAI_API_KEY",
            value: data.openai_api_key.trim(),
          },
        });
        
        if (openaiError) {
          throw new Error(`Failed to update OpenAI API key: ${openaiError.message}`);
        }
      }
      
      if (data.perplexity_api_key && data.perplexity_api_key.trim() !== "") {
        const { error: perplexityError } = await supabase.functions.invoke("update-secret", {
          body: {
            name: "PERPLEXITY_API_KEY",
            value: data.perplexity_api_key.trim(),
          },
        });
        
        if (perplexityError) {
          throw new Error(`Failed to update Perplexity API key: ${perplexityError.message}`);
        }
      }
      
      toast({
        title: "Settings updated",
        description: "Chatbot API keys have been updated successfully.",
      });
      
      // Reset form values to empty strings after successful submission
      form.reset({
        openai_api_key: "",
        perplexity_api_key: "",
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update chatbot settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chatbot API Settings</CardTitle>
        <CardDescription>
          Configure the AI services used by your chatbot. You can use OpenAI, Perplexity, or both (with OpenAI as primary and Perplexity as fallback).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="openai_api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OpenAI API Key</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="sk-..." 
                      type="password" 
                      autoComplete="off" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your OpenAI API key for the primary chatbot functionality.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="perplexity_api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perplexity API Key</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="pplx-..." 
                      type="password" 
                      autoComplete="off" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your Perplexity API key as a fallback option if OpenAI fails.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save API Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChatbotSettings;
