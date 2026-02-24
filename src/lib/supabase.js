import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Evitar crash si faltan credenciales: usar placeholders para que la app cargue
const url = supabaseUrl || 'https://placeholder.supabase.co'
const key = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase: añade VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env para usar Auth')
}

export const supabase = createClient(url, key)
