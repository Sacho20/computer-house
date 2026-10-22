const boton =
  'flex size-11 items-center justify-center rounded-xl border border-line bg-white text-lg font-semibold disabled:opacity-40'

export default function SelectorCantidad({ valor, onChange, nombre, maximo = 99 }) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={`Cantidad de ${nombre}`}>
      <button
        type="button"
        aria-label="Disminuir cantidad"
        disabled={valor <= 1}
        onClick={() => onChange(valor - 1)}
        className={boton}
      >
        −
      </button>
      <span className="w-10 text-center font-semibold" aria-live="polite">
        {valor}
      </span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        disabled={valor >= maximo}
        onClick={() => onChange(valor + 1)}
        className={boton}
      >
        +
      </button>
    </div>
  )
}