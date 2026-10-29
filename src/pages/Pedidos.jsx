// src/pages/Pedidos.jsx
// Pedidos de la persona con sesión iniciada, con su seguimiento.
import { Link } from 'react-router-dom'
import Seguimiento from '../components/Seguimiento'
import EstadoCarga from '../components/EstadoCarga'
import { useAuth } from '../context/useAuth'
import { usePedidos } from '../hooks/usePedidos'
import { pasosPedido } from '../data/datos'
import { formatoPrecio } from '../utils/formato'
import { tituloSeccion, seccion, botonAcento } from '../components/estilos'

function fechaCorta(iso) {
  return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}

function ListaPedidos() {
  const { pedidos, cargando, error, recargar } = usePedidos()

  return (
    <EstadoCarga cargando={cargando} error={error} reintentar={recargar}>
      {pedidos.length === 0 ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-muted">Todavía no tienes pedidos.</p>
          <Link to="/catalogo" className={botonAcento}>
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3 md:max-w-3xl md:gap-4">
          {pedidos.map((p) => (
            <article
              key={p.id}
              className="flex flex-col gap-[18px] rounded-2xl border border-line bg-white p-[18px] md:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-[15px] font-semibold">Pedido #{p.id}</h2>
                  <span className="text-[13px] text-muted">{fechaCorta(p.creado_en)}</span>
                </div>
                <span className="text-[13px] font-semibold">{p.estado}</span>
              </div>

              <Seguimiento paso={Math.max(0, pasosPedido.indexOf(p.estado))} />

              <ul className="flex flex-col gap-1 border-t border-line pt-3 text-sm">
                {p.pedido_items.map((i, n) => (
                  <li key={n} className="flex justify-between gap-3">
                    <span className="text-muted">
                      {i.cantidad} × {i.productos?.nombre ?? 'Producto'}
                    </span>
                    <span className="shrink-0">{formatoPrecio(i.precio_unitario * i.cantidad)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t border-line pt-3">
                <span className="font-semibold">Total</span>
                <span className="font-display text-lg font-bold">{formatoPrecio(p.total)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </EstadoCarga>
  )
}

export default function Pedidos() {
  const { usuario, cargando } = useAuth()

  return (
    <section className={seccion + ' pb-6 md:pb-14'}>
      <h1 className={tituloSeccion}>Mis pedidos</h1>

      {cargando ? (
        <p role="status" className="text-muted">
          Cargando…
        </p>
      ) : !usuario ? (
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-white p-[18px] md:max-w-2xl md:p-6">
          <p className="text-muted">Inicia sesión para ver tus pedidos y su seguimiento.</p>
          <Link to="/cuenta" className={botonAcento}>
            Iniciar sesión
          </Link>
        </div>
      ) : (
        <ListaPedidos />
      )}
    </section>
  )
}
