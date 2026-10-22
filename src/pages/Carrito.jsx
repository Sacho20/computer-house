import { useState } from 'react'
import { Link } from 'react-router-dom'
import ImagenProducto from '../components/ImagenProducto'
import SelectorCantidad from '../components/SelectorCantidad'
import { useCarrito } from '../context/useCarrito'
import { formatoPrecio } from '../utils/formato'
import { tituloSeccion, seccion, botonAcento } from '../components/estilos'

export default function Carrito() {
  const { items, total, cantidadTotal, cambiarCantidad, quitar, vaciar } = useCarrito()
  const [aviso, setAviso] = useState(false)

  if (items.length === 0) {
    return (
      <section className={seccion + ' items-start pb-6 md:pb-14'}>
        <h1 className={tituloSeccion}>Mi carrito</h1>
        <p className="text-muted">Tu carrito está vacío.</p>
        <Link to="/catalogo" className={botonAcento}>
          Ver catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className={seccion + ' pb-6 md:pb-14'}>
      <h1 className={tituloSeccion}>Mi carrito</h1>

      <div className="grid items-start gap-4 md:grid-cols-[1fr_320px]">
        <ul className="flex flex-col gap-3">
          {items.map(({ producto, cantidad }) => (
            <li
              key={producto.id}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-3 md:flex-row md:items-center md:p-4"
            >
              <div className="flex grow items-center gap-3">
                <ImagenProducto producto={producto} className="size-20 shrink-0 rounded-xl" />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <Link to={`/producto/${producto.id}`} className="font-semibold leading-tight">
                    {producto.nombre}
                  </Link>
                  <span className="text-sm text-muted">{formatoPrecio(producto.precio)} c/u</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <SelectorCantidad
                  valor={cantidad}
                  onChange={(n) => cambiarCantidad(producto.id, n)}
                  nombre={producto.nombre}
                />
                <span className="font-display text-lg font-bold">{formatoPrecio(producto.precio * cantidad)}</span>
                <button
                  type="button"
                  onClick={() => quitar(producto.id)}
                  aria-label={`Quitar ${producto.nombre} del carrito`}
                  className="h-11 rounded-xl px-3 text-sm font-semibold text-accent"
                >
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-[18px] md:sticky md:top-4 md:p-6">
          <h2 className="font-display text-lg font-bold">Resumen</h2>
          <div className="flex items-center justify-between text-sm text-muted">
            <span>Artículos</span>
            <span>{cantidadTotal}</span>
          </div>
          <div className="flex items-center justify-between border-t border-line pt-4">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-bold">{formatoPrecio(total)}</span>
          </div>
          <button type="button" onClick={() => setAviso(true)} className={botonAcento}>
            Continuar con la compra
          </button>
          {aviso && (
            <p role="status" className="rounded-xl bg-paper p-3 text-sm">
              El pago todavía no está conectado. Lo haremos en una etapa posterior.
            </p>
          )}
          <button type="button" onClick={vaciar} className="h-11 text-sm font-semibold text-muted">
            Vaciar carrito
          </button>
        </aside>
      </div>
    </section>
  )
}
