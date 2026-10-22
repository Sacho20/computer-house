import { useState } from 'react'
import { Icono } from './Icono'

export default function ImagenProducto({ producto, className = '', iconoClase = 'size-8' }) {
  const [fallo, setFallo] = useState(false)

  if (!producto.imagen || fallo) {
    return (
      <div
        className={
          'flex items-center justify-center bg-[repeating-linear-gradient(135deg,#ECEEE8,#ECEEE8_8px,#E3E5DE_8px,#E3E5DE_16px)] text-[#8A9199] ' +
          className
        }
      >
        <Icono nombre={producto.icono} className={iconoClase} />
      </div>
    )
  }

  return (
    <div className={'overflow-hidden bg-white ' + className}>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        loading="lazy"
        onError={() => setFallo(true)}
        className="size-full object-contain"
      />
    </div>
  )
}
