// public/push-sw.js
// Código extra del service worker para notificaciones push.
// vite-plugin-pwa lo incluye con la opción workbox.importScripts (ver vite.config.js).

// Llega un mensaje del servidor: mostrar la notificación.
self.addEventListener('push', (evento) => {
  let datos = {}
  if (evento.data) {
    try {
      datos = evento.data.json()
    } catch {
      datos = { cuerpo: evento.data.text() }
    }
  }

  evento.waitUntil(
    self.registration.showNotification(datos.titulo || 'Computer House', {
      body: datos.cuerpo || '',
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: datos.tag, // una notificación nueva del mismo pedido reemplaza a la anterior
      data: { url: datos.url || '/' },
    }),
  )
})

// La persona toca la notificación: abrir (o enfocar) la app en la página indicada.
self.addEventListener('notificationclick', (evento) => {
  evento.notification.close()
  const destino = new URL(evento.notification.data?.url || '/', self.location.origin).href

  evento.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async (ventanas) => {
      for (const ventana of ventanas) {
        if (ventana.url.startsWith(self.location.origin)) {
          try {
            await ventana.navigate(destino)
          } catch {
            // Si no se puede navegar, igual se enfoca la ventana.
          }
          return ventana.focus()
        }
      }
      return self.clients.openWindow(destino)
    }),
  )
})
