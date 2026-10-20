import Seguimiento from '../components/Seguimiento'
import { pedidosEjemplo, pasosPedido } from '../data/datos'
import { tituloSeccion, seccion } from '../components/estilos'

export default function Pedidos() {
  return (
    <section className={seccion + ' pb-6 md:pb-14'}>
      <h1 className={tituloSeccion}>Mis pedidos</h1>
      <div className="flex flex-col gap-3 md:max-w-3xl md:gap-4">
        {pedidosEjemplo.map((p) => (
          <article key={p.id} className="flex flex-col gap-[18px] rounded-2xl border border-line bg-white p-[18px] md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[15px] font-semibold">Pedido #{p.id}</h2>
                <span className="text-[13px] text-muted">{p.fecha}</span>
              </div>
              <span className="text-[13px] font-semibold">{pasosPedido[p.paso]}</span>
            </div>
            <Seguimiento paso={p.paso} />
            <div className="flex items-center justify-between gap-3 border-t border-line pt-3 text-sm">
              <span className="text-muted">{p.articulos.join(', ')}</span>
              <span className="shrink-0 font-display font-bold">$ {p.total}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}