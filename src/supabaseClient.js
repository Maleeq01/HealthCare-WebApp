import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lxewbkauuaftqcmpfzel.supabase.co"; // Replace with your Supabase URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZXdia2F1dWFmdHFjbXBmemVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MzQzNzcsImV4cCI6MjA0NjUxMDM3N30.W4dm8Wy5fXnK3-JxJyemZEirwChud9rmRBPscEN2_uU"; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
