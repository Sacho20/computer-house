// src/pages/Catalogo.jsx
// Catálogo completo con filtro por categoría y búsqueda. Los filtros viven en la URL:
// /catalogo?categoria=Laptops&q=asus
import { useSearchParams } from 'react-router-dom'
import { Icono } from '../components/Icono'
import ProductoCard from '../components/ProductoCard'
import EstadoCarga from '../components/EstadoCarga'
import { useCatalogo } from '../context/useCatalogo'
import { tituloSeccion, seccion } from '../components/estilos'

export default function Catalogo() {
  const { productos, categorias, cargando, error, reintentar } = useCatalogo()
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria') || 'Todos'
  const q = params.get('q') || ''

  function actualizar(clave, valor) {
    const nuevos = new URLSearchParams(params)
    if (valor) nuevos.set(clave, valor)
    else nuevos.delete(clave)
    setParams(nuevos, { replace: true })
  }

  const texto = q.trim().toLowerCase()
  const visibles = productos.filter(
    (p) =>
      (categoria === 'Todos' || p.categoria === categoria) &&
      (texto === '' || p.nombre.toLowerCase().includes(texto)),
  )

  const opciones = ['Todos', ...categorias.map((c) => c.nombre)]

  return (
    <section className={seccion}>
      <h1 className={tituloSeccion}>Catálogo</h1>

      <label className="flex h-12 items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 md:max-w-xl">
        <Icono nombre="buscar" className="size-5 text-muted" />
        <input
          type="search"
          aria-label="Buscar productos"
          placeholder="Buscar en el catálogo"
          value={q}
          onChange={(e) => actualizar('q', e.target.value)}
          className="min-w-0 grow bg-transparent text-[15px] outline-none"
        />
      </label>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        {opciones.map((nombre) => {
          const activa = nombre === categoria
          return (
            <button
              key={nombre}
              type="button"
              aria-pressed={activa}
              onClick={() => actualizar('categoria', nombre === 'Todos' ? '' : nombre)}
              className={
                'h-11 rounded-full border px-4 text-sm font-semibold ' +
                (activa ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink')
              }
            >
              {nombre}
            </button>
          )
        })}
      </div>

      <EstadoCarga cargando={cargando} error={error} reintentar={reintentar}>
        <p className="text-sm text-muted">
          {visibles.length} {visibles.length === 1 ? 'producto' : 'productos'}
        </p>

        {visibles.length === 0 ? (
          <p className="rounded-2xl border border-line bg-white p-6 text-center text-muted">
            No encontramos productos con esos filtros.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-6 md:grid-cols-4 md:gap-4 md:pb-14">
            {visibles.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </EstadoCarga>
    </section>
  )
}
