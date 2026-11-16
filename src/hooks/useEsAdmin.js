// src/hooks/useEsAdmin.js
// Averigua si la persona con sesión iniciada es administradora (perfiles.es_admin).
// OJO: esto solo decide qué se muestra en pantalla. La seguridad real está en la base de datos:
// aunque alguien abra /admin a la fuerza, las reglas RLS no le dan ningún dato.
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/useAuth'

export function useEsAdmin() {
  const { usuario } = useAuth()
  const usuarioId = usuario?.id ?? null

  const [resultado, setResultado] = useState({ usuarioId: null, esAdmin: false })

  useEffect(() => {
    if (!usuarioId) return
    let cancelado = false

    async function cargar() {
      const { data } = await supabase.from('perfiles').select('es_admin').eq('id', usuarioId).maybeSingle()
      if (cancelado) return
      // Si hay un error (por ejemplo, todavía no se ejecutó admin.sql), se trata como "no admin".
      setResultado({ usuarioId, esAdmin: data?.es_admin === true })
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [usuarioId])

  // Solo se usa el resultado si es de la persona que tiene la sesión abierta.
  const actual = usuarioId && resultado.usuarioId === usuarioId ? resultado : null

  return {
    esAdmin: actual?.esAdmin ?? false,
    cargando: Boolean(usuarioId) && !actual,
  }
}
