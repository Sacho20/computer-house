// src/pages/admin/AdminPedidos.jsx
// Todos los pedidos de la tienda, con filtro por estado y selector para cambiarlo.
import { useState } from 'react'
import EstadoCarga from '../../components/EstadoCarga'
import FiltroEstados from '../../components/admin/FiltroEstados'
import SelectorEstado from '../../components/admin/SelectorEstado'
import { useAdminDatos } from '../../hooks/useAdminDatos'
import { estadosPedido } from '../../lib/estados'
import { formatoPrecio } from '../../utils/formato'

const COLUMNAS = 'id, usuario_id, estado, total, creado_en, pedido_items(cantidad, precio_unitario, productos(nombre))'

function fechaHora(iso) {
  return new Date(iso).toLocaleString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminPedidos() {
  const { filas, nombres, cargando, error, recargar, cambiarEstado } = useAdminDatos('pedidos', COLUMNAS)
  const [filtro, setFiltro] = useState('')

  const conteos = {}
  for (const p of filas) conteos[p.estado] = (conteos[p.estado] ?? 0) + 1
  const visibles = filtro ? filas.filter((p) => p.estado === filtro) : filas

  return (
    <EstadoCarga cargando={cargando} error={error} reintentar={recargar}>
      <div className="flex flex-col gap-4">
        <FiltroEstados
          opciones={estadosPedido}
          valor={filtro}
          onCambiar={setFiltro}
          conteos={conteos}
          total={filas.length}
        />

        {visibles.length === 0 ? (
          <p className="rounded-2xl border border-line bg-white p-6 text-center text-muted">
            No hay pedidos {filtro ? `en estado “${filtro}”` : 'todavía'}.
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {visibles.map((p) => (
              <li key={p.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-[18px]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <h2 className="text-[15px] font-semibold">Pedido #{p.id}</h2>
                    <span className="truncate text-sm">{nombres[p.usuario_id] || 'Cliente sin nombre'}</span>
                    <span className="text-[13px] text-muted">{fechaHora(p.creado_en)}</span>
                  </div>
                  <span className="shrink-0 font-display text-lg font-bold">{formatoPrecio(p.total)}</span>
                </div>

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

                <SelectorEstado id={p.id} valor={p.estado} opciones={estadosPedido} onCambiar={cambiarEstado} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </EstadoCarga>
  )
}
