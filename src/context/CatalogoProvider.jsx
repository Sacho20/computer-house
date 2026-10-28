// src/context/CatalogoProvider.jsx
// Carga una sola vez los productos, categorías y servicios desde Supabase
// y los comparte con toda la app.
import { useEffect, useMemo, useState } from 'react'
import { CatalogoContext } from './catalogo'
import { supabase } from '../lib/supabase'

export function CatalogoProvider({ children }) {
  const [datos, setDatos] = useState({ productos: [], categorias: [], servicios: [] })
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let cancelado = false

    async function cargar() {
      const [cat, prod, serv] = await Promise.all([
        supabase.from('categorias').select('nombre, icono').order('nombre'),
        supabase
          .from('productos')
          .select('id, nombre, categoria, spec, precio, imagen, descripcion, caracteristicas, icono')
          .order('id'),
        supabase.from('servicios').select('id, nombre, descripcion, icono, precio_desde').order('id'),
      ])
      if (cancelado) return

      if (cat.error || prod.error || serv.error) {
        setError('No se pudo cargar el catálogo. Revisa tu conexión e inténtalo de nuevo.')
      } else {
        setDatos({ categorias: cat.data, productos: prod.data, servicios: serv.data })
        setError(null)
      }
      setCargando(false)
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [intento])

  const valor = useMemo(
    () => ({
      ...datos,
      cargando,
      error,
      reintentar: () => {
        setCargando(true)
        setError(null)
        setIntento((n) => n + 1)
      },
    }),
    [datos, cargando, error],
  )

  return <CatalogoContext.Provider value={valor}>{children}</CatalogoContext.Provider>
}
