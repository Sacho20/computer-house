import { useEffect, useMemo, useState } from 'react'
import { CarritoContext } from './carrito'
import { productos } from '../data/datos'

const CLAVE = 'carrito'
const MAXIMO = 99

function leerGuardado() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE))
    if (!Array.isArray(datos)) return []
    // Descarta líneas dañadas o de productos que ya no existen.
    return datos.filter(
      (l) => l && Number.isInteger(l.cantidad) && l.cantidad > 0 && productos.some((p) => p.id === l.id),
    )
  } catch {
    return []
  }
}

export function CarritoProvider({ children }) {
  const [lineas, setLineas] = useState(leerGuardado)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(lineas))
    } catch {
      /* sin almacenamiento disponible: el carrito sigue funcionando en memoria */
    }
  }, [lineas])

  const valor = useMemo(() => {
    const items = lineas.map((l) => ({
      producto: productos.find((p) => p.id === l.id),
      cantidad: l.cantidad,
    }))

    return {
      items,
      cantidadTotal: items.reduce((suma, i) => suma + i.cantidad, 0),
      total: items.reduce((suma, i) => suma + i.producto.precio * i.cantidad, 0),

      agregar: (id, cantidad = 1) =>
        setLineas((actual) => {
          const existe = actual.find((l) => l.id === id)
          if (!existe) return [...actual, { id, cantidad: Math.min(cantidad, MAXIMO) }]
          return actual.map((l) =>
            l.id === id ? { ...l, cantidad: Math.min(l.cantidad + cantidad, MAXIMO) } : l,
          )
        }),

      cambiarCantidad: (id, cantidad) =>
        setLineas((actual) =>
          actual.map((l) => (l.id === id ? { ...l, cantidad: Math.max(1, Math.min(cantidad, MAXIMO)) } : l)),
        ),

      quitar: (id) => setLineas((actual) => actual.filter((l) => l.id !== id)),

      vaciar: () => setLineas([]),
    }
  }, [lineas])

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}