// src/context/CarritoProvider.jsx
// Guarda el carrito en el dispositivo (localStorage), así no se pierde al recargar.
// Solo guarda { id, cantidad }; los datos del producto salen del catálogo (Supabase).
import { useEffect, useMemo, useState } from 'react'
import { CarritoContext } from './carrito'
import { useCatalogo } from './useCatalogo'

const CLAVE = 'carrito'
const MAXIMO = 99

function leerGuardado() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE))
    if (!Array.isArray(datos)) return []
    // Descarta líneas dañadas.
    return datos.filter((l) => l && Number.isInteger(l.id) && Number.isInteger(l.cantidad) && l.cantidad > 0)
  } catch {
    return []
  }
}

export function CarritoProvider({ children }) {
  const { productos } = useCatalogo()
  const [lineas, setLineas] = useState(leerGuardado)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(lineas))
    } catch {
      /* sin almacenamiento disponible: el carrito sigue funcionando en memoria */
    }
  }, [lineas])

  const valor = useMemo(() => {
    // Une cada línea con su producto; ignora los productos que ya no existen en la tienda.
    const items = lineas
      .map((l) => ({ producto: productos.find((p) => p.id === l.id), cantidad: l.cantidad }))
      .filter((i) => i.producto)

    return {
      items,
      cantidadTotal: items.reduce((suma, i) => suma + i.cantidad, 0),
      total: items.reduce((suma, i) => suma + Number(i.producto.precio) * i.cantidad, 0),

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
  }, [lineas, productos])

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}
