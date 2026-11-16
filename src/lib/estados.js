// src/lib/estados.js
// Estados posibles. Deben ser los mismos que acepta la base de datos (restricciones "check" en esquema.sql).

export const estadosPedido = ['Recibido', 'Preparando', 'Enviado', 'Entregado']

export const estadosServicio = ['Recibida', 'En revisión', 'En proceso', 'Lista', 'Entregada']
