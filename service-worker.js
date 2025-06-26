
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open('modulo4-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './styles.css',
        './script.js',
        './manifest.json'
      ]);
    })
  );
  self.skipWaiting(); // activa inmediatamente
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activado');
  event.waitUntil(self.clients.claim()); // toma control de inmediato
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      return new Response("Sin conexión y sin caché disponible", {
        headers: { 'Content-Type': 'text/plain' }
      });
    })
  );
});
