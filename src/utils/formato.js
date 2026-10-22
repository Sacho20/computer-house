const moneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

// 1500 -> "$1,500.00"
export function formatoPrecio(numero) {
  return moneda.format(numero)
}
