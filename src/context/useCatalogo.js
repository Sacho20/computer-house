// src/context/useCatalogo.js
import { useContext } from 'react'
import { CatalogoContext } from './catalogo'

export function useCatalogo() {
  const contexto = useContext(CatalogoContext)
  if (!contexto) {
    throw new Error('useCatalogo debe usarse dentro de <CatalogoProvider>')
  }
  return contexto
}
