import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Icono } from './Icono'

const enlaces = [
  { nombre: 'Inicio', icono: 'casa', to: '/' },
  { nombre: 'Catálogo', icono: 'catalogo', to: '/catalogo' },
  { nombre: 'Servicios', icono: 'llave', to: '/servicios' },
  { nombre: 'Pedidos', icono: 'paquete', to: '/pedidos' },
  { nombre: 'Cuenta', icono: 'usuario', to: '/cuenta' },
]

// Al cambiar de página, vuelve al inicio de la pantalla.
function ScrollArriba() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Encabezado() {
  return (
    <header className="flex items-center justify-between gap-6 px-5 pb-2 pt-4 md:px-8 md:pt-6">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-[10px] bg-ink text-white">
          <Icono nombre="cpu" className="size-5" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight">Computer House</span>
      </Link>

      <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex">
        {enlaces.map((e) => (
          <NavLink
            key={e.nombre}
            to={e.to}
            end={e.to === '/'}
            className={({ isActive }) =>
              'text-[15px] font-semibold ' + (isActive ? 'text-accent' : 'text-muted hover:text-ink')
            }
          >
            {e.nombre}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Ver carrito"
        className="flex size-11 items-center justify-center rounded-xl border border-line bg-white"
      >
        <Icono nombre="carrito" className="size-[22px]" />
      </button>
    </header>
  )
}

// Solo celular: en PC los enlaces están en el encabezado.
function BarraInferior() {
  return (
    <nav
      aria-label="Navegación inferior"
      className="fixed inset-x-0 bottom-0 flex h-[72px] border-t border-line bg-white md:hidden"
    >
      {enlaces.map((e) => (
        <NavLink
          key={e.nombre}
          to={e.to}
          end={e.to === '/'}
          className={({ isActive }) =>
            'flex flex-1 flex-col items-center justify-center gap-1 text-[11px] ' +
            (isActive ? 'font-semibold text-accent' : 'font-medium text-muted')
          }
        >
          <Icono nombre={e.icono} />
          {e.nombre}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-paper pb-[72px] font-body text-ink md:pb-0">
      <ScrollArriba />
      <div className="mx-auto w-full max-w-6xl">
        <Encabezado />
        <main>
          <Outlet />
        </main>
      </div>
      <BarraInferior />
    </div>
  )
}