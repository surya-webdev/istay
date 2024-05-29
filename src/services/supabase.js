import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://syfvywhrdffjtzqcthck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZnZ5d2hyZGZmanR6cWN0aGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2MzU1MTIsImV4cCI6MjAzMDIxMTUxMn0.3gQgVDDGwmW1Kr-oNL3aPE2y3uDqAcwBXBEv8rkUsi4";
export const supabase = createClient(supabaseUrl, supabaseKey);
