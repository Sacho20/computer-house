// src/pages/Home.jsx
// Página de inicio de la tienda, responsiva (celular y PC).
// Requiere Tailwind CSS v4 con el tema definido en index.css.

const ICONOS = {
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
  teclado: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  laptop: (
    <>
      <rect x="5" y="5" width="14" height="10" rx="1.5" />
      <path d="M2.5 19h19" />
    </>
  ),
  gpu: (
    <>
      <rect x="3" y="7" width="18" height="9" rx="2" />
      <circle cx="9" cy="11.5" r="2.3" />
      <circle cx="16" cy="11.5" r="2.3" />
      <path d="M6 19h12" />
    </>
  ),
  buscar: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  carrito: (
    <>
      <path d="M3 4h2.5l2 11h10.5l2-8H7" />
      <circle cx="9.5" cy="19.5" r="1.3" />
      <circle cx="17" cy="19.5" r="1.3" />
    </>
  ),
  mas: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12l5 5 9-10" />,
  escudo: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  llave: (
    <path d="M15.5 4a4.5 4.5 0 0 0-4.2 6L4 17.3 6.7 20l7.3-7.3A4.5 4.5 0 0 0 20 8.5l-3 3-2.5-.5-.5-2.5 3-3z" />
  ),
  casa: (
    <>
      <path d="M4 11l8-7 8 7v9H4z" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  catalogo: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  paquete: (
    <>
      <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path d="M3.5 7.5L12 12l8.5-4.5M12 12v9" />
    </>
  ),
  usuario: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
}

function Icono({ nombre, className = 'size-6' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {ICONOS[nombre]}
    </svg>
  )
}

// Datos de ejemplo: luego vendrán de la base de datos.
const categorias = [
  { nombre: 'Componentes', icono: 'cpu' },
  { nombre: 'Periféricos', icono: 'teclado' },
  { nombre: 'Computadoras', icono: 'monitor' },
  { nombre: 'Laptops', icono: 'laptop' },
]

const productos = [
  { id: 1, nombre: 'Procesador', spec: '[Especificación]', precio: '[PRECIO]', icono: 'cpu' },
  { id: 2, nombre: 'Tarjeta de video', spec: '[Especificación]', precio: '[PRECIO]', icono: 'gpu' },
  { id: 3, nombre: 'Teclado mecánico', spec: '[Especificación]', precio: '[PRECIO]', icono: 'teclado' },
  { id: 4, nombre: 'Laptop 15.6"', spec: '[Especificación]', precio: '[PRECIO]', icono: 'laptop' },
]

const servicios = [
  {
    id: 'preventivo',
    nombre: 'Mantenimiento preventivo',
    descripcion: 'Limpieza y revisión general para evitar fallas antes de que ocurran.',
    icono: 'escudo',
  },
  {
    id: 'correctivo',
    nombre: 'Mantenimiento correctivo',
    descripcion: 'Diagnóstico y reparación cuando tu equipo ya presenta una falla.',
    icono: 'llave',
  },
]

const pasosPedido = ['Recibido', 'Preparando', 'Enviado', 'Entregado']
const pasoActual = 1 // 0 = Recibido, 1 = Preparando, ...

// Enlaces de navegación: barra inferior en celular, menú superior en PC.
const enlaces = [
  { nombre: 'Inicio', icono: 'casa', href: '#inicio', activo: true },
  { nombre: 'Catálogo', icono: 'catalogo', href: '#catalogo' },
  { nombre: 'Servicios', icono: 'llave', href: '#servicios' },
  { nombre: 'Pedidos', icono: 'paquete', href: '#pedidos' },
  { nombre: 'Cuenta', icono: 'usuario', href: '#cuenta' },
]

const tituloSeccion = 'font-display text-xl font-bold tracking-tight md:text-2xl'
const seccion = 'flex flex-col gap-3 px-5 pt-7 md:px-8 md:pt-12'

function Encabezado() {
  return (
    <header className="flex items-center justify-between gap-6 px-5 pb-2 pt-4 md:px-8 md:pt-6">
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-[10px] bg-ink text-white">
          <Icono nombre="cpu" className="size-5" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight">Computer House</span>
      </div>

      <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex">
        {enlaces.map((e) => (
          <a
            key={e.nombre}
            href={e.href}
            aria-current={e.activo ? 'page' : undefined}
            className={
              'text-[15px] font-semibold ' + (e.activo ? 'text-accent' : 'text-muted hover:text-ink')
            }
          >
            {e.nombre}
          </a>
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

function Buscador() {
  return (
    <div className="px-5 pb-1 pt-2 md:px-8 md:pt-4">
      <label className="flex h-12 items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 md:max-w-xl">
        <Icono nombre="buscar" className="size-5 text-muted" />
        <input
          type="search"
          aria-label="Buscar productos"
          placeholder="Busca procesadores, laptops, teclados"
          className="min-w-0 grow bg-transparent text-[15px] outline-none"
        />
      </label>
    </div>
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
        <a
          href="#catalogo"
          className="flex h-12 items-center justify-center rounded-xl bg-accent px-5 text-[15px] font-semibold text-white md:px-7"
        >
          Ver catálogo
        </a>
        <a
          href="#servicios"
          className="flex h-12 items-center justify-center rounded-xl border border-[#4A525B] px-5 text-[15px] font-semibold text-white md:px-7"
        >
          Pedir servicio
        </a>
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
          <a
            key={c.nombre}
            href="#catalogo"
            className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 hover:border-ink md:p-5"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-paper">
              <Icono nombre={c.icono} />
            </div>
            <span className="text-base font-semibold">{c.nombre}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Destacados() {
  return (
    <section id="catalogo" className={seccion}>
      <div className="flex items-baseline justify-between">
        <h2 className={tituloSeccion}>Destacados</h2>
        <a href="#catalogo" className="text-sm font-semibold text-accent">
          Ver todo
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {productos.map((p) => (
          <article key={p.id} className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-3 md:p-4">
            <div className="mb-2 flex h-[120px] items-center justify-center rounded-[10px] bg-[repeating-linear-gradient(135deg,#ECEEE8,#ECEEE8_8px,#E3E5DE_8px,#E3E5DE_16px)] text-[#8A9199] md:h-44">
              <Icono nombre={p.icono} className="size-8" />
            </div>
            <h3 className="text-[15px] font-semibold leading-tight">{p.nombre}</h3>
            <span className="text-[13px] text-muted">{p.spec}</span>
            <span className="mt-1 font-display text-lg font-bold">$ {p.precio}</span>
            <button
              type="button"
              className="mt-2 flex h-11 items-center justify-center gap-1.5 rounded-[10px] bg-ink text-sm font-semibold text-white"
            >
              <Icono nombre="mas" className="size-[18px]" />
              Agregar
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function Servicios() {
  return (
    <section id="servicios" className={seccion}>
      <h2 className={tituloSeccion}>Servicios técnicos</h2>
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {servicios.map((s) => (
          <article
            key={s.id}
            className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-[18px] md:p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper">
                <Icono nombre={s.icono} />
              </div>
              <h3 className="text-[17px] font-semibold">{s.nombre}</h3>
            </div>
            <p className="text-sm leading-snug text-muted md:grow md:text-base">{s.descripcion}</p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted">Desde $ [PRECIO]</span>
              <a
                href="#solicitar"
                className="flex h-11 items-center justify-center rounded-[10px] bg-accent px-[18px] text-sm font-semibold text-white"
              >
                Solicitar
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function SeguimientoPedido() {
  const avance = (pasoActual / (pasosPedido.length - 1)) * 75 // % del ancho, entre el primer y último punto

  return (
    <section id="pedidos" className={seccion + ' pb-6 md:pb-14'}>
      <h2 className={tituloSeccion}>Sigue tu pedido</h2>
      <div className="flex flex-col gap-[18px] rounded-2xl border border-line bg-white p-[18px] md:max-w-3xl md:p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Pedido #[NÚMERO]</span>
          <span className="text-[13px] text-muted">{pasosPedido[pasoActual]}</span>
        </div>
        <div className="relative flex">
          <div className="absolute left-[12.5%] right-[12.5%] top-[11px] h-0.5 bg-line" />
          <div className="absolute left-[12.5%] top-[11px] h-0.5 bg-accent" style={{ width: `${avance}%` }} />
          {pasosPedido.map((paso, i) => {
            const hecho = i < pasoActual
            const actual = i === pasoActual
            return (
              <div key={paso} className="relative flex w-1/4 flex-col items-center gap-2">
                <div
                  className={
                    'flex size-6 items-center justify-center rounded-full ' +
                    (hecho
                      ? 'bg-accent text-white'
                      : actual
                        ? 'border-4 border-accent bg-white'
                        : 'border-2 border-line bg-white')
                  }
                >
                  {hecho && <Icono nombre="check" className="size-3.5 [stroke-width:3]" />}
                </div>
                <span
                  className={
                    'text-xs md:text-sm ' + (i > pasoActual ? 'text-muted' : 'text-ink') + (actual ? ' font-semibold' : '')
                  }
                >
                  {paso}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
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
        <a
          key={e.nombre}
          href={e.href}
          aria-current={e.activo ? 'page' : undefined}
          className={
            'flex flex-1 flex-col items-center justify-center gap-1 text-[11px] ' +
            (e.activo ? 'font-semibold text-accent' : 'font-medium text-muted')
          }
        >
          <Icono nombre={e.icono} />
          {e.nombre}
        </a>
      ))}
    </nav>
  )
}

export default function Home() {
  return (
    <div id="inicio" className="min-h-screen bg-paper pb-[72px] font-body text-ink md:pb-0">
      <div className="mx-auto w-full max-w-6xl">
        <Encabezado />
        <Buscador />
        <Portada />
        <Categorias />
        <Destacados />
        <Servicios />
        <SeguimientoPedido />
      </div>
      <BarraInferior />
    </div>
  )
}
