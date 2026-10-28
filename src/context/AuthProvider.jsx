// src/context/AuthProvider.jsx
// Mantiene la sesión del usuario (Supabase Auth) y expone entrar, registrar y salir.
import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './auth'
import { supabase } from '../lib/supabase'

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Sesión guardada de visitas anteriores.
    supabase.auth.getSession().then(({ data }) => {
      setSesion(data.session)
      setCargando(false)
    })

    // Se actualiza sola al iniciar o cerrar sesión (también en otras pestañas).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evento, nuevaSesion) => {
      setSesion(nuevaSesion)
    })

    return () => subscription.unsubscribe()
  }, [])

  const valor = useMemo(
    () => ({
      usuario: sesion?.user ?? null,
      cargando,

      entrar: async (correo, clave) => {
        const { error } = await supabase.auth.signInWithPassword({ email: correo, password: clave })
        return { error }
      },

      registrar: async (nombre, correo, clave) => {
        const { data, error } = await supabase.auth.signUp({
          email: correo,
          password: clave,
          options: { data: { nombre } },
        })
        // Si el proyecto exige confirmar el correo, aún no hay sesión.
        return { error, requiereConfirmacion: !error && !data.session }
      },

      salir: async () => {
        const { error } = await supabase.auth.signOut()
        return { error }
      },
    }),
    [sesion, cargando],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
