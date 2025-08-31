import { createClient } from '@supabase/supabase-js'

// ✅ Replace with your own values from Supabase dashboard → Project Settings → API
const supabaseUrl = "https://hugruinfpqjgcqgiiatl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1Z3J1aW5mcHFqZ2NxZ2lpYXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MjgyNTMsImV4cCI6MjA3MjIwNDI1M30.IliIuAFwrDWwE0ftvUCEraIumundh9Ol5ztYClcTyJo"

export const supabase = createClient(supabaseUrl, supabaseKey)
