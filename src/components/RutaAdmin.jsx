// src/components/RutaAdmin.jsx
// Protege /admin: solo deja pasar a administradores. Muestra las pestañas Pedidos / Servicios.
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useEsAdmin } from '../hooks/useEsAdmin'
import { tituloSeccion, seccion, botonAcento } from './estilos'

function Aviso({ children, enlace }) {
  return (
    <section className={seccion + ' items-start pb-6 md:pb-14'}>
      <h1 className={tituloSeccion}>Administración</h1>
      <p className="text-muted">{children}</p>
      {enlace}
    </section>
  )
}

export default function RutaAdmin() {
  const { usuario, cargando: cargandoSesion } = useAuth()
  const { esAdmin, cargando } = useEsAdmin()

  if (cargandoSesion || cargando) {
    return (
      <section className={seccion + ' pb-6 md:pb-14'}>
        <h1 className={tituloSeccion}>Administración</h1>
        <p role="status" className="text-muted">
          Cargando…
        </p>
      </section>
    )
  }

  if (!usuario) {
    return (
      <Aviso
        enlace={
          <Link to="/cuenta" className={botonAcento}>
            Iniciar sesión
          </Link>
        }
      >
        Inicia sesión con una cuenta de administrador.
      </Aviso>
    )
  }

  if (!esAdmin) {
    return (
      <Aviso
        enlace={
          <Link to="/" className="text-sm font-semibold text-accent">
            Volver al inicio
          </Link>
        }
      >
        Tu cuenta no tiene permiso para ver esta sección.
      </Aviso>
    )
  }

  const pestana = ({ isActive }) =>
    'flex h-11 flex-1 items-center justify-center rounded-xl border text-sm font-semibold md:flex-none md:px-8 ' +
    (isActive ? 'border-ink bg-ink text-white' : 'border-line bg-white')

  return (
    <section className={seccion + ' pb-6 md:pb-14'}>
      <h1 className={tituloSeccion}>Administración</h1>
      <nav aria-label="Secciones de administración" className="flex gap-2">
        <NavLink to="/admin/pedidos" className={pestana}>
          Pedidos
        </NavLink>
        <NavLink to="/admin/servicios" className={pestana}>
          Servicios
        </NavLink>
      </nav>
      <Outlet />
    </section>
  )
}
