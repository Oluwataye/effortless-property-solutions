import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bbzawuisboqzcdjmcvgl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiemF3dWlzYm9xemNkam1jdmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzI5ODksImV4cCI6MjAyMjQ0ODk4OX0.O6ZrI5nS3QZfW7X1RZPEDpEh11TQCu1yWVH5LPeXyKM';

export const supabase = createClient(supabaseUrl, supabaseKey);