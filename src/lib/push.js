// src/lib/push.js
// Notificaciones push: activar, desactivar y consultar el estado en este dispositivo.
// Necesita la variable VITE_VAPID_PUBLIC_KEY (clave pública VAPID) en .env.local y en Vercel.
import { supabase } from './supabase'

const CLAVE_PUBLICA = import.meta.env.VITE_VAPID_PUBLIC_KEY

export const pushConfigurado = Boolean(CLAVE_PUBLICA)

export function pushSoportado() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
}

// La clave VAPID viene en base64 "URL-safe"; el navegador la pide como bytes.
function aBytes(base64Url) {
  const relleno = '='.repeat((4 - (base64Url.length % 4)) % 4)
  const base64 = (base64Url + relleno).replace(/-/g, '+').replace(/_/g, '/')
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
}

// Si no hay service worker registrado (por ejemplo, en desarrollo sin PWA), "ready" nunca termina.
function obtenerRegistro() {
  return Promise.race([
    navigator.serviceWorker.ready,
    new Promise((_, rechazar) => setTimeout(() => rechazar(new Error('sin-service-worker')), 5000)),
  ])
}

async function guardar(suscripcion) {
  const { endpoint, keys } = suscripcion.toJSON()
  const { error } = await supabase.rpc('guardar_suscripcion', {
    p_endpoint: endpoint,
    p_p256dh: keys?.p256dh,
    p_clave_auth: keys?.auth,
  })
  return !error
}

// 'no-soportado' | 'bloqueado' | 'inactivo' | 'activo'
export async function estadoPush() {
  if (!pushSoportado()) return 'no-soportado'
  if (Notification.permission === 'denied') return 'bloqueado'
  try {
    const registro = await obtenerRegistro()
    const suscripcion = await registro.pushManager.getSubscription()
    if (!suscripcion) return 'inactivo'
    // Si el dispositivo ya estaba suscrito, se asocia a la persona que tiene la sesión abierta.
    await guardar(suscripcion)
    return 'activo'
  } catch {
    return 'inactivo'
  }
}

// Devuelve { ok: true } o { ok: false, motivo: 'bloqueado' | 'cancelado' | 'servidor' | 'error' }
export async function activarPush() {
  if (!pushSoportado() || !CLAVE_PUBLICA) return { ok: false, motivo: 'error' }

  const permiso = await Notification.requestPermission()
  if (permiso !== 'granted') return { ok: false, motivo: permiso === 'denied' ? 'bloqueado' : 'cancelado' }

  try {
    const registro = await obtenerRegistro()
    const opciones = { userVisibleOnly: true, applicationServerKey: aBytes(CLAVE_PUBLICA) }

    let suscripcion = await registro.pushManager.getSubscription()
    if (!suscripcion) {
      suscripcion = await registro.pushManager.subscribe(opciones)
    }
    return (await guardar(suscripcion)) ? { ok: true } : { ok: false, motivo: 'servidor' }
  } catch {
    return { ok: false, motivo: 'error' }
  }
}

// Borra la suscripción del servidor y de este navegador. Nunca lanza errores.
export async function desactivarPush() {
  if (!pushSoportado()) return
  try {
    const registro = await obtenerRegistro()
    const suscripcion = await registro.pushManager.getSubscription()
    if (!suscripcion) return
    await supabase.rpc('borrar_suscripcion', { p_endpoint: suscripcion.endpoint })
    await suscripcion.unsubscribe()
  } catch {
    // No pasa nada: la suscripción se limpia sola cuando el servidor detecta que ya no existe.
  }
}
