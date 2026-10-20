import { Icono } from './Icono'

export default function ProductoCard({ producto }) {
  return (
    <article className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-3 md:p-4">
      <div className="mb-2 flex h-[120px] items-center justify-center rounded-[10px] bg-[repeating-linear-gradient(135deg,#ECEEE8,#ECEEE8_8px,#E3E5DE_8px,#E3E5DE_16px)] text-[#8A9199] md:h-44">
        <Icono nombre={producto.icono} className="size-8" />
      </div>
      <h3 className="text-[15px] font-semibold leading-tight">{producto.nombre}</h3>
      <span className="text-[13px] text-muted">{producto.spec}</span>
      <span className="mt-1 font-display text-lg font-bold">$ {producto.precio}</span>
      <button
        type="button"
        className="mt-2 flex h-11 items-center justify-center gap-1.5 rounded-[10px] bg-ink text-sm font-semibold text-white"
      >
        <Icono nombre="mas" className="size-[18px]" />
        Agregar
      </button>
    </article>
  )
}
