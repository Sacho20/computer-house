// src/lib/errores.js
// Convierte los errores de Supabase Auth en mensajes claros en español.

const mensajes = {
  'Invalid login credentials': 'Correo o contraseña incorrectos.',
  'Email not confirmed': 'Confirma tu correo antes de iniciar sesión.',
  'User already registered': 'Ese correo ya está registrado.',
}

export function traducirError(error) {
  if (!error) return ''
  if (mensajes[error.message]) return mensajes[error.message]
  if (error.name === 'AuthRetryableFetchError') return 'No hay conexión con el servidor. Revisa tu internet.'
  if (error.status === 429 || error.code === 'over_email_send_rate_limit') {
    return 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.'
  }
  if (/password/i.test(error.message)) return 'La contraseña no cumple los requisitos (mínimo 8 caracteres).'
  return 'No se pudo completar la acción. Inténtalo de nuevo.'
}
