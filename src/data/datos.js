export const categorias = [
  { nombre: 'Componentes', icono: 'cpu' },
  { nombre: 'Periféricos', icono: 'teclado' },
  { nombre: 'Computadoras', icono: 'monitor' },
  { nombre: 'Laptops', icono: 'laptop' },
]

export const productos = [
  { id: 1, nombre: 'Procesador', categoria: 'Componentes', spec: '[Especificación]', precio: '[PRECIO]', icono: 'cpu' },
  { id: 2, nombre: 'Tarjeta de video', categoria: 'Componentes', spec: '[Especificación]', precio: '[PRECIO]', icono: 'gpu' },
  { id: 3, nombre: 'Teclado mecánico', categoria: 'Periféricos', spec: '[Especificación]', precio: '[PRECIO]', icono: 'teclado' },
  { id: 4, nombre: 'Laptop 15.6"', categoria: 'Laptops', spec: '[Especificación]', precio: '[PRECIO]', icono: 'laptop' },
  { id: 5, nombre: 'Memoria RAM', categoria: 'Componentes', spec: '[Especificación]', precio: '[PRECIO]', icono: 'cpu' },
  { id: 6, nombre: 'Monitor', categoria: 'Periféricos', spec: '[Especificación]', precio: '[PRECIO]', icono: 'monitor' },
  { id: 7, nombre: 'Computadora de escritorio', categoria: 'Computadoras', spec: '[Especificación]', precio: '[PRECIO]', icono: 'monitor' },
  { id: 8, nombre: 'Laptop para trabajo', categoria: 'Laptops', spec: '[Especificación]', precio: '[PRECIO]', icono: 'laptop' },
]

export const servicios = [
  {
    id: 'preventivo',
    nombre: 'Mantenimiento preventivo',
    descripcion: 'Limpieza y revisión general para evitar fallas antes de que ocurran.',
    icono: 'escudo',
  },
  {
    id: 'correctivo',
    nombre: 'Mantenimiento correctivo',
    descripcion: 'Diagnóstico y reparación cuando tu equipo ya presenta una falla.',
    icono: 'llave',
  },
]

export const pasosPedido = ['Recibido', 'Preparando', 'Enviado', 'Entregado']

export const pedidosEjemplo = [
  { id: '[NÚMERO 1]', fecha: '[FECHA]', total: '[TOTAL]', paso: 1, articulos: ['Procesador', 'Teclado mecánico'] },
  { id: '[NÚMERO 2]', fecha: '[FECHA]', total: '[TOTAL]', paso: 3, articulos: ['Laptop 15.6"'] },
]