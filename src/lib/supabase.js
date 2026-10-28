// src/lib/supabase.js
// Cliente de Supabase. Lee la URL y la publishable key de .env.local (o de las variables de Vercel).
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const clave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !clave) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY. Agrégalas en .env.local (y en Vercel) y reinicia el servidor.',
  )
}

export const supabase = createClient(url, clave)
