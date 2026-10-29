import { Link } from 'react-router-dom'
import ImagenProducto from './ImagenProducto'
import BotonAgregar from './BotonAgregar'
import { formatoPrecio } from '../utils/formato'

export default function ProductoCard({ producto }) {
  return (
    <article className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-3 md:p-4">
      <Link to={`/producto/${producto.id}`} className="flex flex-col gap-1">
        <ImagenProducto producto={producto} className="mb-2 h-[120px] rounded-[10px] md:h-44" />
        <h3 className="text-[15px] font-semibold leading-tight">{producto.nombre}</h3>
        <span className="line-clamp-2 text-[13px] text-muted">{producto.spec}</span>
        <span className="mt-1 font-display text-lg font-bold">{formatoPrecio(producto.precio)}</span>
      </Link>
      <BotonAgregar producto={producto} className="mt-2" />
    </article>
  )
}
