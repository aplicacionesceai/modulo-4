self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('modulo4-store').then(cache => cache.addAll([
      './',
      './index.html',
      './styles.css',
      './script.js'
    ]))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
