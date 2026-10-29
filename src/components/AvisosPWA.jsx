// src/components/AvisosPWA.jsx
// Avisos de la PWA: instalar la app, nueva versión disponible y sin conexión.
import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function useEstaEnLinea() {
  const [enLinea, setEnLinea] = useState(() => navigator.onLine)
  useEffect(() => {
    const subir = () => setEnLinea(true)
    const bajar = () => setEnLinea(false)
    window.addEventListener('online', subir)
    window.addEventListener('offline', bajar)
    return () => {
      window.removeEventListener('online', subir)
      window.removeEventListener('offline', bajar)
    }
  }, [])
  return enLinea
}

// El navegador avisa cuando la app se puede instalar; guardamos el evento para lanzarlo con un botón.
function useInstalar() {
  const [evento, setEvento] = useState(null)

  useEffect(() => {
    const guardar = (e) => {
      e.preventDefault()
      setEvento(e)
    }
    const limpiar = () => setEvento(null)
    window.addEventListener('beforeinstallprompt', guardar)
    window.addEventListener('appinstalled', limpiar)
    return () => {
      window.removeEventListener('beforeinstallprompt', guardar)
      window.removeEventListener('appinstalled', limpiar)
    }
  }, [])

  async function instalar() {
    if (!evento) return
    evento.prompt()
    await evento.userChoice
    setEvento(null) // el evento solo se puede usar una vez
  }

  return { puedeInstalar: Boolean(evento), instalar, descartar: () => setEvento(null) }
}

const tarjeta =
  'pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-3.5 text-sm shadow-lg'
const botonChico = 'h-10 shrink-0 rounded-xl bg-accent px-4 text-sm font-semibold text-white'
const botonTexto = 'h-10 shrink-0 rounded-xl px-3 text-sm font-semibold text-muted'

export default function AvisosPWA() {
  const enLinea = useEstaEnLinea()
  const { puedeInstalar, instalar, descartar } = useInstalar()
  const {
    needRefresh: [hayVersionNueva, setHayVersionNueva],
    updateServiceWorker,
  } = useRegisterSW()

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[84px] z-50 flex flex-col gap-2 px-4 md:bottom-4 md:left-auto md:right-4 md:w-96 md:px-0"
    >
      {!enLinea && (
        <p role="status" className={tarjeta + ' bg-ink text-white'}>
          Sin conexión. Verás lo último que se guardó en este dispositivo.
        </p>
      )}

      {hayVersionNueva && (
        <div role="status" className={tarjeta}>
          <span>Hay una nueva versión de la tienda.</span>
          <span className="flex shrink-0 gap-1">
            <button type="button" onClick={() => setHayVersionNueva(false)} className={botonTexto}>
              Luego
            </button>
            <button type="button" onClick={() => updateServiceWorker(true)} className={botonChico}>
              Actualizar
            </button>
          </span>
        </div>
      )}

      {puedeInstalar && (
        <div role="status" className={tarjeta}>
          <span>Instala la app para abrirla más rápido.</span>
          <span className="flex shrink-0 gap-1">
            <button type="button" onClick={descartar} className={botonTexto}>
              Ahora no
            </button>
            <button type="button" onClick={instalar} className={botonChico}>
              Instalar
            </button>
          </span>
        </div>
      )}
    </div>
  )
}
