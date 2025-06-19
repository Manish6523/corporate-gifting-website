import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://okcvvfslqgxoogyxevea.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rY3Z2ZnNscWd4b29neXhldmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMzQwNDcsImV4cCI6MjA2NTcxMDA0N30.aFePH2FArsPvokJXOfR2h-hOfUgElUrlU1hn7vRkqmM"
export const supabase = createClient(supabaseUrl, supabaseKey)