import { Icono } from './Icono'
import { pasosPedido } from '../data/datos'

// paso: 0 = Recibido, 1 = Preparando, 2 = Enviado, 3 = Entregado
export default function Seguimiento({ paso }) {
  const avance = (paso / (pasosPedido.length - 1)) * 75 // % del ancho, entre el primer y último punto

  return (
    <div className="relative flex">
      <div className="absolute left-[12.5%] right-[12.5%] top-[11px] h-0.5 bg-line" />
      <div className="absolute left-[12.5%] top-[11px] h-0.5 bg-accent" style={{ width: `${avance}%` }} />
      {pasosPedido.map((nombre, i) => {
        const hecho = i < paso
        const actual = i === paso
        return (
          <div key={nombre} className="relative flex w-1/4 flex-col items-center gap-2">
            <div
              className={
                'flex size-6 items-center justify-center rounded-full ' +
                (hecho
                  ? 'bg-accent text-white'
                  : actual
                    ? 'border-4 border-accent bg-white'
                    : 'border-2 border-line bg-white')
              }
            >
              {hecho && <Icono nombre="check" className="size-3.5 [stroke-width:3]" />}
            </div>
            <span
              className={
                'text-xs md:text-sm ' + (i > paso ? 'text-muted' : 'text-ink') + (actual ? ' font-semibold' : '')
              }
            >
              {nombre}
            </span>
          </div>
        )
      })}
    </div>
  )
}