import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tituloSeccion, seccion, campo, botonAcento } from '../components/estilos'

export default function Cuenta() {
  const [modo, setModo] = useState('entrar') // 'entrar' | 'crear'
  const [aviso, setAviso] = useState(false)
  const creando = modo === 'crear'

  function enviar(e) {
    e.preventDefault()
    // Aquí se conectará el inicio de sesión con la base de datos.
    setAviso(true)
  }

  function cambiarModo(nuevo) {
    setModo(nuevo)
    setAviso(false)
  }

  return (
    <section className={seccion + ' pb-6 md:pb-14'}>
      <h1 className={tituloSeccion}>Mi cuenta</h1>

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
          </div>

          <button type="submit" className={botonAcento}>
            {creando ? 'Crear cuenta' : 'Entrar'}
          </button>

          {aviso && (
            <p role="status" className="rounded-xl bg-paper p-3 text-sm">
              El inicio de sesión todavía no está conectado a una base de datos. Lo haremos en la siguiente etapa.
            </p>
          )}
        </form>

        <Link to="/pedidos" className="text-sm font-semibold text-accent">
          Ver mis pedidos
        </Link>
      </div>
    </section>
  )
}