// src/pages/Servicios.jsx
// Lista de servicios, formulario para solicitar uno (guarda en Supabase) y "Mis solicitudes".
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ServicioCard from '../components/ServicioCard'
import EstadoCarga from '../components/EstadoCarga'
import { useCatalogo } from '../context/useCatalogo'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'
import { tituloSeccion, seccion, campo, botonAcento } from '../components/estilos'

function fechaCorta(iso) {
  return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}

function MisSolicitudes({ lista, servicios }) {
  const nombreServicio = (id) => servicios.find((s) => s.id === id)?.nombre ?? id

  return (
    <section className={seccion + ' pb-6 md:pb-14'}>
      <h2 className={tituloSeccion}>Mis solicitudes</h2>

      {!lista ? (
        <p role="status" className="text-muted">
          Cargando…
        </p>
      ) : lista.error ? (
        <p role="alert" className="text-muted">
          {lista.error}
        </p>
      ) : lista.filas.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-6 text-center text-muted">
          Todavía no has enviado ninguna solicitud.
        </p>
      ) : (
        <ul className="flex flex-col gap-3 md:max-w-2xl">
          {lista.filas.map((s) => (
            <li key={s.id} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-[18px]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h3 className="font-semibold leading-tight">{nombreServicio(s.servicio_id)}</h3>
                  <span className="text-[13px] text-muted">
                    {s.equipo} · {fechaCorta(s.creado_en)}
                  </span>
                </div>
                <span
                  className={
                    'shrink-0 rounded-full px-3 py-1 text-xs font-semibold ' +
                    (s.estado === 'Lista' ? 'bg-accent text-white' : 'border border-line')
                  }
                >
                  {s.estado}
                </span>
              </div>
              <p className="line-clamp-2 text-sm text-muted">{s.descripcion}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function Servicios() {
  const { servicios, cargando, error, reintentar } = useCatalogo()
  const { usuario, cargando: cargandoSesion } = useAuth()
  const usuarioId = usuario?.id ?? null

  const formRef = useRef(null)
  const [tipo, setTipo] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null) // { tipo: 'ok' | 'error', texto }
  const [lista, setLista] = useState({ usuarioId: null, filas: [], error: null })
  const [recarga, setRecarga] = useState(0)

  // Mientras no se elija otro, se usa el primer servicio de la lista.
  const tipoActual = tipo || servicios[0]?.id || ''

  // Solo se usa la lista si es de la persona que tiene la sesión abierta.
  const listaActual = usuarioId && lista.usuarioId === usuarioId ? lista : null

  useEffect(() => {
    if (!usuarioId) return
    let cancelado = false

    async function cargar() {
      const { data, error: fallo } = await supabase
        .from('solicitudes_servicio')
        .select('id, servicio_id, equipo, descripcion, estado, creado_en')
        .order('creado_en', { ascending: false })
      if (cancelado) return
      setLista({
        usuarioId,
        filas: data ?? [],
        error: fallo ? 'No se pudieron cargar tus solicitudes.' : null,
      })
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [usuarioId, recarga])

  function elegir(id) {
    setTipo(id)
    setMensaje(null)
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function enviar(e) {
    e.preventDefault()
    const formulario = e.currentTarget
    const datos = new FormData(formulario)
    const equipo = String(datos.get('equipo')).trim()
    const telefono = String(datos.get('telefono')).trim()
    const descripcion = String(datos.get('descripcion')).trim()

    if (!equipo || !telefono || !descripcion) {
      setMensaje({ tipo: 'error', texto: 'Completa todos los campos.' })
      return
    }

    setEnviando(true)
    setMensaje(null)

    // usuario_id lo pone la base de datos con la sesión de quien envía.
    const { error: fallo } = await supabase.from('solicitudes_servicio').insert({
      servicio_id: tipoActual,
      equipo,
      telefono,
      descripcion,
    })

    if (fallo) {
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo enviar la solicitud. Revisa tu conexión e inténtalo de nuevo.',
      })
    } else {
      formulario.reset()
      setMensaje({ tipo: 'ok', texto: 'Solicitud enviada. Puedes ver su estado en "Mis solicitudes".' })
      setRecarga((n) => n + 1)
    }
    setEnviando(false)
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

      <section ref={formRef} className={seccion + (usuario ? '' : ' pb-6 md:pb-14') + ' scroll-mt-4'}>
        <h2 className={tituloSeccion}>Solicitar un servicio</h2>

        {cargandoSesion ? (
          <p role="status" className="text-muted">
            Cargando…
          </p>
        ) : !usuario ? (
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-white p-[18px] md:max-w-2xl md:p-6">
            <p className="text-muted">Inicia sesión o crea una cuenta para solicitar un servicio y ver su estado.</p>
            <Link to="/cuenta" className={botonAcento}>
              Iniciar sesión
            </Link>
          </div>
        ) : (
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
              <input
                id="equipo"
                name="equipo"
                required
                maxLength={120}
                placeholder="Ej. Laptop, computadora de escritorio"
                className={campo}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="telefono" className="text-sm font-semibold">
                Teléfono de contacto
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                autoComplete="tel"
                required
                maxLength={30}
                className={campo}
              />
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
                maxLength={1000}
                className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] outline-none focus:border-ink"
              />
            </div>

            <button type="submit" disabled={enviando || !tipoActual} className={botonAcento + ' disabled:opacity-60'}>
              {enviando ? 'Enviando…' : 'Enviar solicitud'}
            </button>

            {mensaje && (
              <p
                role={mensaje.tipo === 'error' ? 'alert' : 'status'}
                className={
                  'rounded-xl p-3 text-sm ' + (mensaje.tipo === 'error' ? 'bg-[#FBE9E4] text-[#8A2B0C]' : 'bg-paper')
                }
              >
                {mensaje.texto}
              </p>
            )}
          </form>
        )}
      </section>

      {usuario && <MisSolicitudes lista={listaActual} servicios={servicios} />}
    </>
  )
}
