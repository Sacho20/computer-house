import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Producto from './pages/Producto'
import Carrito from './pages/Carrito'
import Servicios from './pages/Servicios'
import Pedidos from './pages/Pedidos'
import Cuenta from './pages/Cuenta'
import NoEncontrada from './pages/NoEncontrada'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="producto/:id" element={<Producto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="cuenta" element={<Cuenta />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}