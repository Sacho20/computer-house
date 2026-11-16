// src/hooks/useAdminDatos.js
// Carga todas las filas de una tabla (pedidos o solicitudes_servicio) más los nombres de los clientes,
// y permite cambiar el estado de una fila. Solo funciona para admins: la base de datos lo exige.
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const LIMITE = 200 // las 200 más recientes; suficiente para una tienda pequeña

export function useAdminDatos(tabla, columnas) {
  const [resultado, setResultado] = useState(null) // { filas, nombres, error }
  const [recarga, setRecarga] = useState(0)

  useEffect(() => {
    let cancelado = false

    async function cargar() {
      const [filas, perfiles] = await Promise.all([
        supabase.from(tabla).select(columnas).order('creado_en', { ascending: false }).limit(LIMITE),
        supabase.from('perfiles').select('id, nombre'),
      ])
      if (cancelado) return

      const nombres = {}
      for (const p of perfiles.data ?? []) nombres[p.id] = p.nombre

      setResultado({
        filas: filas.data ?? [],
        nombres,
        error: filas.error ? 'No se pudieron cargar los datos.' : null,
      })
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [tabla, columnas, recarga])

  const recargar = useCallback(() => setRecarga((n) => n + 1), [])

  // Devuelve { ok }. Si la base de datos no cambia ninguna fila (por ejemplo, sin permiso), ok es false.
  const cambiarEstado = useCallback(
    async (id, estado) => {
      const { data, error } = await supabase.from(tabla).update({ estado }).eq('id', id).select('id, estado')
      if (error || !data || data.length === 0) return { ok: false }

      setResultado((anterior) =>
        anterior
          ? { ...anterior, filas: anterior.filas.map((f) => (f.id === id ? { ...f, estado: data[0].estado } : f)) }
          : anterior,
      )
      return { ok: true }
    },
    [tabla],
  )

  return {
    filas: resultado?.filas ?? [],
    nombres: resultado?.nombres ?? {},
    cargando: resultado === null,
    error: resultado?.error ?? null,
    recargar,
    cambiarEstado,
  }
}
