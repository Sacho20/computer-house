// src/pages/Servicios.jsx
// Lista de servicios y formulario para solicitar uno.
import { useRef, useState } from 'react'
import ServicioCard from '../components/ServicioCard'
import EstadoCarga from '../components/EstadoCarga'
import { useCatalogo } from '../context/useCatalogo'
import { tituloSeccion, seccion, campo, botonAcento } from '../components/estilos'

export default function Servicios() {
  const { servicios, cargando, error, reintentar } = useCatalogo()
  const formRef = useRef(null)
  const [tipo, setTipo] = useState('')
  const [enviado, setEnviado] = useState(false)

  // Mientras no se elija otro, se usa el primer servicio de la lista.
  const tipoActual = tipo || servicios[0]?.id || ''

  function elegir(id) {
    setTipo(id)
    setEnviado(false)
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function enviar(e) {
    e.preventDefault()
    // En la siguiente etapa la solicitud se guardará en Supabase.
    setEnviado(true)
    e.target.reset()
  }

  return (
    <>
      <section className={seccion}>
        <h1 className={tituloSeccion}>Servicios técnicos</h1>
        <EstadoCarga cargando={cargando} error={error} reintentar={reintentar}>
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {servicios.map((s) => (
              <ServicioCard key={s.id} servicio={s} onSolicitar={elegir} />
            ))}
          </div>
        </EstadoCarga>
      </section>

      <section ref={formRef} className={seccion + ' scroll-mt-4 pb-6 md:pb-14'}>
        <h2 className={tituloSeccion}>Solicitar un servicio</h2>
        <form
          onSubmit={enviar}
          className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-[18px] md:max-w-2xl md:p-6"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="tipo" className="text-sm font-semibold">
              Tipo de servicio
            </label>
            <select id="tipo" value={tipoActual} onChange={(e) => setTipo(e.target.value)} className={campo}>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="equipo" className="text-sm font-semibold">
              Equipo
            </label>
            <input id="equipo" name="equipo" required placeholder="Ej. Laptop, computadora de escritorio" className={campo} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefono" className="text-sm font-semibold">
              Teléfono de contacto
            </label>
            <input id="telefono" name="telefono" type="tel" autoComplete="tel" required className={campo} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="descripcion" className="text-sm font-semibold">
              Describe el problema o lo que necesitas
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={4}
              required
              className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] outline-none focus:border-ink"
            />
          </div>

          <button type="submit" className={botonAcento}>
            Enviar solicitud
          </button>

          {enviado && (
            <p role="status" className="rounded-xl bg-paper p-3 text-sm">
              Solicitud registrada. Por ahora no se guarda en ningún servidor; la conectaremos en la siguiente etapa.
            </p>
          )}
        </form>
      </section>
    </>
  )
}
