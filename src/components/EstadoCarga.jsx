// src/components/EstadoCarga.jsx
// Muestra "Cargando…" o un error con botón de reintentar; cuando todo está bien, muestra su contenido.
export default function EstadoCarga({ cargando, error, reintentar, children }) {
  if (cargando) {
    return (
      <p role="status" className="rounded-2xl border border-line bg-white p-6 text-center text-muted">
        Cargando…
      </p>
    )
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-6 text-center"
      >
        <p className="text-muted">{error}</p>
        {reintentar && (
          <button
            type="button"
            onClick={reintentar}
            className="h-11 rounded-xl bg-ink px-5 text-sm font-semibold text-white"
          >
            Reintentar
          </button>
        )}
      </div>
    )
  }

  return children ?? null
}
