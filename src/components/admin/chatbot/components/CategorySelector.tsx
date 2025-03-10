import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChatbotCategories } from "../hooks/use-chatbot-categories";
import { UseFormReturn } from "react-hook-form";
import { KnowledgeFormData } from "../schema/knowledge-form-schema";

interface CategorySelectorProps {
  form: UseFormReturn<KnowledgeFormData>;
  customCategory: string;
  setCustomCategory: (value: string) => void;
  handleCategorySelect: (value: string) => void;
}

export function CategorySelector({
  form,
  customCategory,
  setCustomCategory,
  handleCategorySelect,
}: CategorySelectorProps) {
  const { data: categories, isLoading: isCategoriesLoading } = useChatbotCategories();

  return (
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
            onValueChange={handleCategorySelect}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select or create a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="new">Create new category</SelectItem>
              
              {categories?.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {field.value === "new" && (
            <div className="mt-2">
              <Input
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter a new category name"
              />
            </div>
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
