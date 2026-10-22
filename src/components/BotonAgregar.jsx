import { useEffect, useState } from 'react'
import { Icono } from './Icono'
import { useCarrito } from '../context/useCarrito'

export default function BotonAgregar({ producto, cantidad = 1, className = '' }) {
  const { agregar } = useCarrito()
  const [agregado, setAgregado] = useState(false)

  // El aviso "Agregado" desaparece solo después de un momento.
  useEffect(() => {
    if (!agregado) return
    const temporizador = setTimeout(() => setAgregado(false), 1500)
    return () => clearTimeout(temporizador)
  }, [agregado])

  function alAgregar() {
    agregar(producto.id, cantidad)
    setAgregado(true)
  }

  return (
    <button
      type="button"
      onClick={alAgregar}
      className={
        'flex h-11 items-center justify-center gap-1.5 rounded-[10px] text-sm font-semibold text-white ' +
        (agregado ? 'bg-accent ' : 'bg-ink ') +
        className
      }
    >
      <Icono nombre={agregado ? 'check' : 'mas'} className="size-[18px]" />
      <span aria-live="polite">{agregado ? 'Agregado' : 'Agregar'}</span>
    </button>
  )
}
