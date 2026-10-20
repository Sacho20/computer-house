import { Link } from 'react-router-dom'
import { tituloSeccion, seccion, botonAcento } from '../components/estilos'

export default function NoEncontrada() {
  return (
    <section className={seccion + ' items-start pb-6 md:pb-14'}>
      <h1 className={tituloSeccion}>Página no encontrada</h1>
      <p className="text-muted">La dirección que abriste no existe.</p>
      <Link to="/" className={botonAcento}>
        Volver al inicio
      </Link>
    </section>
  )
}
