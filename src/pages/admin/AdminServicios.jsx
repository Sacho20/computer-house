// src/pages/admin/AdminServicios.jsx
// Todas las solicitudes de servicio técnico, con filtro por estado y selector para cambiarlo.
import { useState } from 'react'
import EstadoCarga from '../../components/EstadoCarga'
import FiltroEstados from '../../components/admin/FiltroEstados'
import SelectorEstado from '../../components/admin/SelectorEstado'
import { useAdminDatos } from '../../hooks/useAdminDatos'
import { useCatalogo } from '../../context/useCatalogo'
import { estadosServicio } from '../../lib/estados'

const COLUMNAS = 'id, usuario_id, servicio_id, equipo, telefono, descripcion, estado, creado_en'

function fechaHora(iso) {
  return new Date(iso).toLocaleString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminServicios() {
  const { filas, nombres, cargando, error, recargar, cambiarEstado } = useAdminDatos('solicitudes_servicio', COLUMNAS)
  const { servicios } = useCatalogo()
  const [filtro, setFiltro] = useState('')

  const nombreServicio = (id) => servicios.find((s) => s.id === id)?.nombre ?? id

  const conteos = {}
  for (const s of filas) conteos[s.estado] = (conteos[s.estado] ?? 0) + 1
  const visibles = filtro ? filas.filter((s) => s.estado === filtro) : filas

  return (
    <EstadoCarga cargando={cargando} error={error} reintentar={recargar}>
      <div className="flex flex-col gap-4">
        <FiltroEstados
          opciones={estadosServicio}
          valor={filtro}
          onCambiar={setFiltro}
          conteos={conteos}
          total={filas.length}
        />

        {visibles.length === 0 ? (
          <p className="rounded-2xl border border-line bg-white p-6 text-center text-muted">
            No hay solicitudes {filtro ? `en estado “${filtro}”` : 'todavía'}.
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {visibles.map((s) => (
              <li key={s.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-[18px]">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-[15px] font-semibold">{nombreServicio(s.servicio_id)}</h2>
                  <span className="text-sm">
                    {nombres[s.usuario_id] || 'Cliente sin nombre'} · {s.equipo}
                  </span>
                  <span className="text-[13px] text-muted">{fechaHora(s.creado_en)}</span>
                  <a href={`tel:${s.telefono}`} className="text-sm font-semibold text-accent">
                    {s.telefono}
                  </a>
                </div>

                <p className="whitespace-pre-line break-words border-t border-line pt-3 text-sm text-muted">
                  {s.descripcion}
                </p>

                <SelectorEstado id={s.id} valor={s.estado} opciones={estadosServicio} onCambiar={cambiarEstado} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </EstadoCarga>
  )
}
