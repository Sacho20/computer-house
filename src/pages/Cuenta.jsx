// src/pages/Cuenta.jsx
// Inicio de sesión, registro y perfil del usuario (Supabase Auth).
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { traducirError } from '../lib/errores'
import { tituloSeccion, seccion, campo, botonAcento } from '../components/estilos'

function Perfil() {
  const { usuario, salir } = useAuth()
  const [saliendo, setSaliendo] = useState(false)
  const nombre = usuario.user_metadata?.nombre

  async function cerrarSesion() {
    setSaliendo(true)
    await salir()
    setSaliendo(false)
  }

  return (
    <div className="flex flex-col gap-4 md:max-w-md">
      <div className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-[18px] md:p-6">
        <span className="text-sm text-muted">Sesión iniciada como</span>
        {nombre && <span className="font-display text-xl font-bold">{nombre}</span>}
        <span className="break-all text-[15px]">{usuario.email}</span>
      </div>

      <Link to="/pedidos" className="text-sm font-semibold text-accent">
        Ver mis pedidos
      </Link>

      <button
        type="button"
        onClick={cerrarSesion}
        disabled={saliendo}
        className="h-12 rounded-xl border border-line bg-white text-[15px] font-semibold disabled:opacity-60"
      >
        {saliendo ? 'Cerrando sesión…' : 'Cerrar sesión'}
      </button>
    </div>
  )
}

function Acceso() {
  const { entrar, registrar } = useAuth()
  const [modo, setModo] = useState('entrar') // 'entrar' | 'crear'
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null) // { tipo: 'error' | 'ok', texto }
  const creando = modo === 'crear'

  function cambiarModo(nuevo) {
    setModo(nuevo)
    setMensaje(null)
  }

  async function enviar(e) {
    e.preventDefault()
    const datos = new FormData(e.currentTarget)
    const correo = String(datos.get('correo')).trim()
    const clave = String(datos.get('clave'))
    const nombre = String(datos.get('nombre') ?? '').trim()

    setEnviando(true)
    setMensaje(null)

    if (creando) {
      const { error, requiereConfirmacion } = await registrar(nombre, correo, clave)
      if (error) {
        setMensaje({ tipo: 'error', texto: traducirError(error) })
      } else if (requiereConfirmacion) {
        setMensaje({
          tipo: 'ok',
          texto: 'Te enviamos un correo para confirmar tu cuenta. Ábrelo y después inicia sesión.',
        })
      }
    } else {
      const { error } = await entrar(correo, clave)
      if (error) setMensaje({ tipo: 'error', texto: traducirError(error) })
    }

    setEnviando(false)
  }

  return (
    <div className="flex flex-col gap-4 md:max-w-md">
      <div className="flex gap-2" role="group" aria-label="Elegir acción">
        <button
          type="button"
          aria-pressed={!creando}
          onClick={() => cambiarModo('entrar')}
          className={
            'h-11 flex-1 rounded-xl border text-sm font-semibold ' +
            (!creando ? 'border-ink bg-ink text-white' : 'border-line bg-white')
          }
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          aria-pressed={creando}
          onClick={() => cambiarModo('crear')}
          className={
            'h-11 flex-1 rounded-xl border text-sm font-semibold ' +
            (creando ? 'border-ink bg-ink text-white' : 'border-line bg-white')
          }
        >
          Crear cuenta
        </button>
      </div>

      <form onSubmit={enviar} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-[18px] md:p-6">
        {creando && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nombre" className="text-sm font-semibold">
              Nombre
            </label>
            <input id="nombre" name="nombre" autoComplete="name" required className={campo} />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="correo" className="text-sm font-semibold">
            Correo electrónico
          </label>
          <input id="correo" name="correo" type="email" autoComplete="email" required className={campo} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="clave" className="text-sm font-semibold">
            Contraseña
          </label>
          <input
            id="clave"
            name="clave"
            type="password"
            autoComplete={creando ? 'new-password' : 'current-password'}
            minLength={8}
            required
            className={campo}
          />
          {creando && <span className="text-xs text-muted">Mínimo 8 caracteres.</span>}
        </div>

        <button type="submit" disabled={enviando} className={botonAcento + ' disabled:opacity-60'}>
          {enviando ? 'Un momento…' : creando ? 'Crear cuenta' : 'Entrar'}
        </button>

        {mensaje && (
          <p
            role={mensaje.tipo === 'error' ? 'alert' : 'status'}
            className={'rounded-xl p-3 text-sm ' + (mensaje.tipo === 'error' ? 'bg-[#FBE9E4] text-[#8A2B0C]' : 'bg-paper')}
          >
            {mensaje.texto}
          </p>
        )}
      </form>
    </div>
  )
}

export default function Cuenta() {
  const { usuario, cargando } = useAuth()

  return (
    <section className={seccion + ' pb-6 md:pb-14'}>
      <h1 className={tituloSeccion}>Mi cuenta</h1>
      {cargando ? (
        <p role="status" className="text-muted">
          Cargando…
        </p>
      ) : usuario ? (
        <Perfil />
      ) : (
        <Acceso />
      )}
    </section>
  )
}
