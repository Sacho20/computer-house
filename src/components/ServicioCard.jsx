import { Link } from 'react-router-dom'
import { Icono } from './Icono'

const claseBoton =
  'flex h-11 items-center justify-center rounded-[10px] bg-accent px-[18px] text-sm font-semibold text-white'

// Si recibe onSolicitar muestra un botón (página de Servicios); si no, un enlace a /servicios (Inicio).
export default function ServicioCard({ servicio, onSolicitar }) {
  return (
    <article className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-[18px] md:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper">
          <Icono nombre={servicio.icono} />
        </div>
        <h3 className="text-[17px] font-semibold">{servicio.nombre}</h3>
      </div>
      <p className="text-sm leading-snug text-muted md:grow md:text-base">{servicio.descripcion}</p>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-muted">Desde $ [PRECIO]</span>
        {onSolicitar ? (
          <button type="button" onClick={() => onSolicitar(servicio.id)} className={claseBoton}>
            Solicitar
          </button>
        ) : (
          <Link to="/servicios" className={claseBoton}>
            Solicitar
          </Link>
        )}
      </div>
    </article>
  )
}