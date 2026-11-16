// src/components/admin/FiltroEstados.jsx
// Botones para filtrar la lista por estado, con el número de elementos de cada uno.
export default function FiltroEstados({ opciones, valor, onCambiar, conteos, total }) {
  const boton = (activo) =>
    'h-10 shrink-0 rounded-full border px-4 text-sm font-semibold ' +
    (activo ? 'border-ink bg-ink text-white' : 'border-line bg-white')

  return (
    <div role="group" aria-label="Filtrar por estado" className="flex flex-wrap gap-2">
      <button type="button" aria-pressed={valor === ''} onClick={() => onCambiar('')} className={boton(valor === '')}>
        Todos ({total})
      </button>
      {opciones.map((o) => (
        <button key={o} type="button" aria-pressed={valor === o} onClick={() => onCambiar(o)} className={boton(valor === o)}>
          {o} ({conteos[o] ?? 0})
        </button>
      ))}
    </div>
  )
}
