export const categorias = [
  { nombre: 'Componentes', icono: 'cpu' },
  { nombre: 'Periféricos', icono: 'teclado' },
  { nombre: 'Computadoras', icono: 'monitor' },
  { nombre: 'Laptops', icono: 'laptop' },
]

export const productos = [
  {
    id: 1,
    nombre: 'Procesador Ryzen 5 5600G',
    categoria: 'Componentes',
    spec: 'El procesador AMD Ryzen 5 5600G es una unidad de procesamiento acelerado (APU) con gráficos integrados',
    precio: 3000, // EJEMPLO
    imagen: '/productos/ryzen5.jpg',
    descripcion: 'Unidad de procesamiento acelerado (APU) con gráficos integrados',
    caracteristicas: ['Arquitectura: Zen 3', 'Zócalo / Socket: AM4', 'Núcleos de CPU: 6','Hilos (Threads): 12','Frecuencia base: 3.9 GHz','Modelo: Radeon Graphics (Vega 7)'],
    icono: 'cpu',
  },
  {
    id: 2,
    nombre: 'Tarjeta de video RX 6600',
    categoria: 'Componentes',
    spec: 'La tarjeta gráfica AMD Radeon RX 6600 de 8 GB es una excelente opción de gama media para jugar a 1080p con gráficos altos o medios',
    precio: 6000, // EJEMPLO
    imagen: '/productos/rx6600.png',
    descripcion: 'La tarjeta gráfica AMD Radeon RX 6600 de 8 GB es una excelente opción de gama media para jugar a 1080p con gráficos altos o medios',
    caracteristicas: ['Memoria: 8 GB GDDR6 con interfaz de 128 bits y tecnología Infinity Cache de 32 MB.', 'Arquitectura: AMD RDNA 2 (7 nm), con soporte para DirectX 12 Ultimate y trazado de rayos (Ray Tracing).', 'Consumo energético: Alrededor de 132W a 140W, requiriendo una fuente de poder recomendada de al menos 450W–550W con un conector de 8 pines.'],
    icono: 'gpu',
  },
  {
    id: 3,
    nombre: 'Teclado mecánico Razer Blackwidow V3',
    categoria: 'Periféricos',
    spec: 'El Razer BlackWidow V3 es un teclado mecánico para juegos de tamaño completo que destaca por su durabilidad, iluminación personalizable y controles multimedia dedicados.',
    precio: 3000, // EJEMPLO
    imagen: '/productos/mecanico.jpg',
    descripcion: 'El Razer BlackWidow V3 es un teclado mecánico para juegos de tamaño completo que destaca por su durabilidad, iluminación personalizable y controles multimedia dedicados.',
    caracteristicas: ['Mecanico', 'Gaming'],
    icono: 'teclado',
  },
  {
    id: 4,
    nombre: 'ASUS TUF F16"',
    categoria: 'Laptops',
    spec: 'La ASUS TUF Gaming F16 es una laptop para juegos y productividad que destaca por su pantalla de 16 pulgadas con relación de aspecto 16:10 y su resistencia de grado militar',
    precio: 25000, // EJEMPLO
    imagen: '/productos/laptopgamer.jpg',
    descripcion: 'La ASUS TUF Gaming F16 es una laptop para juegos y productividad que destaca por su pantalla de 16 pulgadas con relación de aspecto 16:10 y su resistencia de grado militar',
    caracteristicas: ['Pantalla: 16 pulgadas FHD+ (1920 x 1200), con tasa de refresco de 144Hz o 165Hz', 'Procesador (CPU): Opciones con Intel Core 5 (como el 210H), Intel Core i5 (como el 14450HX) o Intel Core i7 (como el 14650HX).', 'Tarjetas Gráficas (GPU): Configuraciones que van desde la NVIDIA GeForce RTX 3050, RTX 4050, hasta gráficas más recientes como la RTX 5050 o RTX 5070',' 16 GB DDR5 de fábrica (ampliable hasta 64 GB a través de sus dos ranuras SO-DIMM).','Almacenamiento: Unidad SSD M.2 NVMe PCIe 4.0 de 512 GB o 1 TB (con ranuras adicionales para expansión).'],
    icono: 'laptop',
  },
  {
    id: 5,
    nombre: 'Memoria RAM Kingston Fury DDR4 8GB',
    categoria: 'Componentes',
    spec: 'Memoria Kingston FURY Beast DDR4 de 8GB ',
    precio: 1500, // EJEMPLO
    imagen: '/productos/ram.jpg',
    descripcion: 'Memoria Kingston FURY Beast DDR4 de 8GB',
    caracteristicas: ['Capacidad: 8 GB', 'Tipo de memoria: DDR4 DIMM (288 pines)', 'Velocidad / Frecuencia: 3200 MT/s (3200 MHz)'],
    icono: 'cpu',
  },
  {
    id: 6,
    nombre: 'Monitor Samsung Odyssey G3',
    categoria: 'Periféricos',
    spec: 'El Samsung Odyssey G3 es un monitor para videojuegos diseñado para ofrecer fluidez y rendimiento a precio accesible',
    precio: 3000, // EJEMPLO
    imagen: '/productos/monitor.jpg',
    descripcion: 'El Samsung Odyssey G3 es un monitor para videojuegos diseñado para ofrecer fluidez y rendimiento a precio accesible',
    caracteristicas: ['Resolución: Full HD (1920 x 1080 píxeles) en relación de aspecto 16:9', 'Tasa de refresco: Hasta 180 Hz', 'Tiempo de respuesta: 1 ms (MPRT) para reducir el desenfoque en movimiento'],
    icono: 'monitor',
  },
  {
    id: 7,
    nombre: 'Computadora PRIDE SPIDER',
    categoria: 'Computadoras',
    spec: 'Computadora PRIDE SPIDER / NVIDIA GeForce RTX 3050 6GB / AMD Ryzen 5 5500 / 16GB RAM DDR4 / 1TB SSD / 700W 80+ BRONZE / WIFI / BT / GENESIS',
    precio: 15000, // EJEMPLO
    imagen: '/productos/pcescritorio.jpg',
    descripcion: 'Computadora PRIDE SPIDER / NVIDIA GeForce RTX 3050 6GB / AMD Ryzen 5 5500 / 16GB RAM DDR4 / 1TB SSD / 700W 80+ BRONZE / WIFI / BT / GENESIS',
    caracteristicas: ['NVIDIA GeForce RTX 3050 6GB', 'AMD Ryzen 5 5500 ', '16GB RAM DDR4','1TB SSD','700W 80+ BRONZE'],
    icono: 'monitor',
  },
  {
    id: 8,
    nombre: 'Laptop HP 245 G10',
    categoria: 'Laptops',
    spec: 'Laptop HP 245 G10, 14" 1366x768 HD, AMD Ryzen 5 7520U, 8GB, 512GB SSD, ',
    precio: 10000, // EJEMPLO
    imagen: '/productos/laptop.jpg',
    descripcion: 'Laptop HP 245 G10, 14" 1366x768 HD, AMD Ryzen 5 7520U, 8GB, 512GB SSD, ',
    caracteristicas: ['Ryzen 5 7520U', '8GB RAM', '512GB SSD'],
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
