import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImagenProducto from '../components/ImagenProducto'
import BotonAgregar from '../components/BotonAgregar'
import SelectorCantidad from '../components/SelectorCantidad'
import ProductoCard from '../components/ProductoCard'
import { productos } from '../data/datos'
import { formatoPrecio } from '../utils/formato'
import { tituloSeccion, seccion } from '../components/estilos'
import NoEncontrada from './NoEncontrada'

function Detalle({ producto }) {
  const [cantidad, setCantidad] = useState(1)
  const relacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4)

  return (
    <>
      <div className="px-5 pt-4 md:px-8 md:pt-8">
        <Link to="/catalogo" className="text-sm font-semibold text-accent">
          ← Volver al catálogo
        </Link>
      </div>

      <section className="grid gap-6 px-5 pt-4 md:grid-cols-2 md:gap-10 md:px-8 md:pt-6">
        <ImagenProducto
          producto={producto}
          className="aspect-square w-full rounded-2xl border border-line"
          iconoClase="size-16"
        />

        <div className="flex flex-col gap-4">
          <Link
            to={`/catalogo?categoria=${encodeURIComponent(producto.categoria)}`}
            className="text-xs font-semibold uppercase tracking-[0.08em] text-muted"
          >
            {producto.categoria}
          </Link>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {producto.nombre}
          </h1>
          <p className="text-muted">{producto.spec}</p>
          <span className="font-display text-3xl font-bold">{formatoPrecio(producto.precio)}</span>

          <div className="flex flex-wrap items-center gap-3">
            <SelectorCantidad valor={cantidad} onChange={setCantidad} nombre={producto.nombre} />
            <BotonAgregar producto={producto} cantidad={cantidad} className="h-12 grow px-6 md:grow-0" />
          </div>

          <div className="flex flex-col gap-2 border-t border-line pt-4">
            <h2 className="font-display text-lg font-bold">Descripción</h2>
            <p className="leading-relaxed text-muted">{producto.descripcion}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-bold">Características</h2>
            <ul className="flex flex-col gap-1.5">
              {producto.caracteristicas.map((c) => (
                <li key={c} className="flex gap-2 text-muted">
                  <span aria-hidden="true">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className={seccion + ' pb-6 md:pb-14'}>
          <h2 className={tituloSeccion}>Más de {producto.categoria}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {relacionados.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default function Producto() {
  const { id } = useParams()
  const producto = productos.find((p) => String(p.id) === id)

  if (!producto) return <NoEncontrada />
  // key: al pasar de un producto a otro, se reinicia la cantidad y la imagen.
  return <Detalle key={producto.id} producto={producto} />
}