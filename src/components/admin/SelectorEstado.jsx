// src/components/admin/SelectorEstado.jsx
// Lista desplegable para cambiar el estado de un pedido o solicitud.
import { useId, useState } from 'react'

export default function SelectorEstado({ id, valor, opciones, onCambiar }) {
  const idCampo = useId()
  const [guardando, setGuardando] = useState(false)
  const [fallo, setFallo] = useState(false)

  async function cambiar(e) {
    setGuardando(true)
    setFallo(false)
    const { ok } = await onCambiar(id, e.target.value)
    if (!ok) setFallo(true)
    setGuardando(false)
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={idCampo} className="text-xs font-semibold text-muted">
        Estado
      </label>
      <select
        id={idCampo}
        value={valor}
        disabled={guardando}
        onChange={cambiar}
        className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-ink disabled:opacity-60"
      >
        {opciones.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {guardando && (
        <span role="status" className="text-xs text-muted">
          Guardando…
        </span>
      )}
      {fallo && (
        <span role="alert" className="text-xs text-[#8A2B0C]">
          No se pudo guardar el cambio. Inténtalo de nuevo.
        </span>
      )}
    </div>
  )
}
