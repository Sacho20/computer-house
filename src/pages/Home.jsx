import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icono } from '../components/Icono'
import ProductoCard from '../components/ProductoCard'
import ServicioCard from '../components/ServicioCard'
import Seguimiento from '../components/Seguimiento'
import { categorias, productos, servicios, pedidosEjemplo, pasosPedido } from '../data/datos'
import { tituloSeccion, seccion } from '../components/estilos'

function Buscador() {
  const navigate = useNavigate()
  const [texto, setTexto] = useState('')

  function buscar(e) {
    e.preventDefault()
    const q = texto.trim()
    navigate(q ? `/catalogo?q=${encodeURIComponent(q)}` : '/catalogo')
  }

  return (
    <form role="search" onSubmit={buscar} className="px-5 pb-1 pt-2 md:px-8 md:pt-4">
      <label className="flex h-12 items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 md:max-w-xl">
        <Icono nombre="buscar" className="size-5 text-muted" />
        <input
          type="search"
          aria-label="Buscar productos"
          placeholder="Busca procesadores, laptops, teclados"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="min-w-0 grow bg-transparent text-[15px] outline-none"
        />
      </label>
    </form>
  )
}

function Portada() {
  return (
    <section className="relative mx-5 mt-4 flex flex-col gap-3.5 overflow-hidden rounded-[20px] bg-ink p-6 text-white md:mx-8 md:mt-6 md:gap-5 md:rounded-[28px] md:p-14">
      <svg
        aria-hidden="true"
        viewBox="0 0 220 220"
        fill="none"
        stroke="#2B3138"
        strokeWidth="2"
        className="absolute -right-[50px] -top-10 size-[220px] md:-right-10 md:-top-16 md:size-[440px]"
      >
        <rect x="60" y="60" width="100" height="100" rx="12" />
        <rect x="85" y="85" width="50" height="50" rx="6" />
        <path d="M85 60V20M110 60V10M135 60V20M85 160v40M110 160v50M135 160v40M60 85H20M60 110H10M60 135H20M160 85h40M160 110h50M160 135h40" />
      </svg>
      <span className="relative text-xs font-semibold uppercase tracking-[0.08em] text-[#FF8A5C] md:text-sm">
        Venta y servicio técnico
      </span>
      <h1 className="relative max-w-[270px] font-display text-3xl font-bold leading-[1.1] tracking-tight md:max-w-xl md:text-5xl">
        Arma, mejora o repara tu equipo.
      </h1>
      <p className="relative max-w-[290px] text-[15px] leading-snug text-[#C5CAD0] md:max-w-lg md:text-lg">
        Componentes, periféricos, computadoras y laptops, y servicio de mantenimiento cuando lo necesites.
      </p>
      <div className="relative mt-1 flex flex-wrap gap-2.5 md:mt-3 md:gap-3">
        <Link
          to="/catalogo"
          className="flex h-12 items-center justify-center rounded-xl bg-accent px-5 text-[15px] font-semibold text-white md:px-7"
        >
          Ver catálogo
        </Link>
        <Link
          to="/servicios"
          className="flex h-12 items-center justify-center rounded-xl border border-[#4A525B] px-5 text-[15px] font-semibold text-white md:px-7"
        >
          Pedir servicio
        </Link>
      </div>
    </section>
  )
}

function Categorias() {
  return (
    <section className={seccion}>
      <h2 className={tituloSeccion}>Categorías</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {categorias.map((c) => (
          <Link
            key={c.nombre}
            to={`/catalogo?categoria=${encodeURIComponent(c.nombre)}`}
            className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 hover:border-ink md:p-5"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-paper">
              <Icono nombre={c.icono} />
            </div>
            <span className="text-base font-semibold">{c.nombre}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Destacados() {
  return (
    <section className={seccion}>
      <div className="flex items-baseline justify-between">
        <h2 className={tituloSeccion}>Destacados</h2>
        <Link to="/catalogo" className="text-sm font-semibold text-accent">
          Ver todo
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {productos.slice(0, 4).map((p) => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>
    </section>
  )
}

function ServiciosInicio() {
  return (
    <section className={seccion}>
      <h2 className={tituloSeccion}>Servicios técnicos</h2>
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {servicios.map((s) => (
          <ServicioCard key={s.id} servicio={s} />
        ))}
      </div>
    </section>
  )
}

function SeguimientoInicio() {
  const pedido = pedidosEjemplo[0]
  return (
    <section className={seccion + ' pb-6 md:pb-14'}>
      <div className="flex items-baseline justify-between">
        <h2 className={tituloSeccion}>Sigue tu pedido</h2>
        <Link to="/pedidos" className="text-sm font-semibold text-accent">
          Ver mis pedidos
        </Link>
      </div>
      <div className="flex flex-col gap-[18px] rounded-2xl border border-line bg-white p-[18px] md:max-w-3xl md:p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Pedido #{pedido.id}</span>
          <span className="text-[13px] text-muted">{pasosPedido[pedido.paso]}</span>
        </div>
        <Seguimiento paso={pedido.paso} />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Buscador />
      <Portada />
      <Categorias />
      <Destacados />
      <ServiciosInicio />
      <SeguimientoInicio />
    </>
  )
}
