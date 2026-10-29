// src/hooks/usePedidos.js
// Carga los pedidos de la persona con sesión iniciada (con sus artículos), del más nuevo al más viejo.
// La seguridad de la base de datos garantiza que solo vea los suyos.
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/useAuth'

export function usePedidos() {
  const { usuario } = useAuth()
  const usuarioId = usuario?.id ?? null

  const [resultado, setResultado] = useState({ usuarioId: null, pedidos: [], error: null })
  const [recarga, setRecarga] = useState(0)

  useEffect(() => {
    if (!usuarioId) return
    let cancelado = false

    async function cargar() {
      const { data, error } = await supabase
        .from('pedidos')
        .select('id, estado, total, creado_en, pedido_items(cantidad, precio_unitario, productos(nombre))')
        .order('creado_en', { ascending: false })
      if (cancelado) return
      setResultado({
        usuarioId,
        pedidos: data ?? [],
        error: error ? 'No se pudieron cargar tus pedidos.' : null,
      })
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [usuarioId, recarga])

  const recargar = useCallback(() => setRecarga((n) => n + 1), [])

  // Solo se usa el resultado si es de la persona que tiene la sesión abierta.
  const actual = usuarioId && resultado.usuarioId === usuarioId ? resultado : null

  return {
    pedidos: actual?.pedidos ?? [],
    cargando: Boolean(usuarioId) && !actual,
    error: actual?.error ?? null,
    recargar,
  }
}
