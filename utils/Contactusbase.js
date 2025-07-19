
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irlwrgznovxxtsflizoz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlybHdyZ3pub3Z4eHRzZmxpem96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MTA4MTEsImV4cCI6MjA2ODQ4NjgxMX0.6lKiPVLPKWFKVhDSnAcxT5BNeyKoVXR43tzqqnRF2YI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
