// src/components/BotonNotificaciones.jsx
// Tarjeta de la pestaña Cuenta para activar o desactivar los avisos de pedidos y servicios.
import { useEffect, useState } from 'react'
import { activarPush, desactivarPush, estadoPush, pushConfigurado } from '../lib/push'

const textos = {
  'no-soportado':
    'Este navegador no admite notificaciones. En iPhone, instala primero la app en la pantalla de inicio (Compartir → Añadir a pantalla de inicio).',
  bloqueado:
    'Bloqueaste las notificaciones de este sitio. Para recibirlas, permítelas en la configuración del navegador.',
  inactivo: 'Recibe un aviso cuando cambie el estado de tus pedidos y de tus solicitudes de servicio.',
  activo: 'Notificaciones activadas en este dispositivo.',
}

const mensajesError = {
  cancelado: 'No se activaron las notificaciones.',
  servidor: 'No se pudo guardar la suscripción. Inténtalo de nuevo.',
  error: 'No se pudieron activar las notificaciones. Inténtalo de nuevo.',
}

export default function BotonNotificaciones() {
  const [estado, setEstado] = useState(null) // null = comprobando
  const [trabajando, setTrabajando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelado = false
    estadoPush().then((e) => {
      if (!cancelado) setEstado(e)
    })
    return () => {
      cancelado = true
    }
  }, [])

  // Sin la clave VAPID configurada no se muestra nada.
  if (!pushConfigurado) return null

  async function activar() {
    setTrabajando(true)
    setError(null)
    const resultado = await activarPush()
    if (resultado.ok) {
      setEstado('activo')
    } else if (resultado.motivo === 'bloqueado') {
      setEstado('bloqueado')
    } else {
      setError(mensajesError[resultado.motivo] ?? mensajesError.error)
    }
    setTrabajando(false)
  }

  async function desactivar() {
    setTrabajando(true)
    setError(null)
    await desactivarPush()
    setEstado('inactivo')
    setTrabajando(false)
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-[18px] md:p-6">
      <h2 className="font-display text-lg font-bold">Notificaciones</h2>

      {estado === null ? (
        <p role="status" className="text-sm text-muted">
          Comprobando…
        </p>
      ) : (
        <p className="text-sm text-muted">{textos[estado]}</p>
      )}

      {estado === 'inactivo' && (
        <button
          type="button"
          onClick={activar}
          disabled={trabajando}
          className="flex h-12 items-center justify-center rounded-xl bg-accent px-5 text-[15px] font-semibold text-white disabled:opacity-60"
        >
          {trabajando ? 'Activando…' : 'Activar notificaciones'}
        </button>
      )}

      {estado === 'activo' && (
        <button
          type="button"
          onClick={desactivar}
          disabled={trabajando}
          className="h-12 rounded-xl border border-line bg-white text-[15px] font-semibold disabled:opacity-60"
        >
          {trabajando ? 'Desactivando…' : 'Desactivar notificaciones'}
        </button>
      )}

      {error && (
        <p role="alert" className="rounded-xl bg-[#FBE9E4] p-3 text-sm text-[#8A2B0C]">
          {error}
        </p>
      )}
    </div>
  )
}
