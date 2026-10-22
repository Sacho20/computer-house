export const categorias = [
  { nombre: 'Componentes', icono: 'cpu' },
  { nombre: 'Periféricos', icono: 'teclado' },
  { nombre: 'Computadoras', icono: 'monitor' },
  { nombre: 'Laptops', icono: 'laptop' },
]

export const productos = [
  {
    id: 1,
    nombre: 'Procesador',
    categoria: 'Componentes',
    spec: '[Especificación]',
    precio: 1500, // EJEMPLO
    imagen: '/productos/procesador.webp',
    descripcion: '[Descripción del producto]',
    caracteristicas: ['[Característica 1]', '[Característica 2]', '[Característica 3]'],
    icono: 'cpu',
  },
  {
    id: 2,
    nombre: 'Tarjeta de video',
    categoria: 'Componentes',
    spec: '[Especificación]',
    precio: 6000, // EJEMPLO
    imagen: '/productos/tarjeta-de-video.webp',
    descripcion: '[Descripción del producto]',
    caracteristicas: ['[Característica 1]', '[Característica 2]', '[Característica 3]'],
    icono: 'gpu',
  },
  {
    id: 3,
    nombre: 'Teclado mecánico',
    categoria: 'Periféricos',
    spec: '[Especificación]',
    precio: 1200, // EJEMPLO
    imagen: '/productos/teclado-mecanico.webp',
    descripcion: '[Descripción del producto]',
    caracteristicas: ['[Característica 1]', '[Característica 2]', '[Característica 3]'],
    icono: 'teclado',
  },
  {
    id: 4,
    nombre: 'Laptop 15.6"',
    categoria: 'Laptops',
    spec: '[Especificación]',
    precio: 12000, // EJEMPLO
    imagen: '/productos/laptop-15.webp',
    descripcion: '[Descripción del producto]',
    caracteristicas: ['[Característica 1]', '[Característica 2]', '[Característica 3]'],
    icono: 'laptop',
  },
  {
    id: 5,
    nombre: 'Memoria RAM',
    categoria: 'Componentes',
    spec: '[Especificación]',
    precio: 900, // EJEMPLO
    imagen: '/productos/memoria-ram.webp',
    descripcion: '[Descripción del producto]',
    caracteristicas: ['[Característica 1]', '[Característica 2]', '[Característica 3]'],
    icono: 'cpu',
  },
  {
    id: 6,
    nombre: 'Monitor',
    categoria: 'Periféricos',
    spec: '[Especificación]',
    precio: 3000, // EJEMPLO
    imagen: '/productos/monitor.webp',
    descripcion: '[Descripción del producto]',
    caracteristicas: ['[Característica 1]', '[Característica 2]', '[Característica 3]'],
    icono: 'monitor',
  },
  {
    id: 7,
    nombre: 'Computadora de escritorio',
    categoria: 'Computadoras',
    spec: '[Especificación]',
    precio: 10000, // EJEMPLO
    imagen: '/productos/computadora-de-escritorio.webp',
    descripcion: '[Descripción del producto]',
    caracteristicas: ['[Característica 1]', '[Característica 2]', '[Característica 3]'],
    icono: 'monitor',
  },
  {
    id: 8,
    nombre: 'Laptop para trabajo',
    categoria: 'Laptops',
    spec: '[Especificación]',
    precio: 15000, // EJEMPLO
    imagen: '/productos/laptop-para-trabajo.webp',
    descripcion: '[Descripción del producto]',
    caracteristicas: ['[Característica 1]', '[Característica 2]', '[Característica 3]'],
    icono: 'laptop',
  },
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
