import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bbzawuisboqzcdjmcvgl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiemF3dWlzYm9xemNkam1jdmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5ODI0NDYsImV4cCI6MjA1MDU1ODQ0Nn0.T5R6x3PmiSxKuIjyXzq7Ujte33Zasn-EQ40_5kBLELc';

export const supabase = createClient(supabaseUrl, supabaseKey);