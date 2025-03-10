
import * as z from "zod";

export const knowledgeFormSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.string().min(1, "Category is required"),
});

export type KnowledgeFormData = z.infer<typeof knowledgeFormSchema>;

export interface KnowledgeItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}
