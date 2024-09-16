const cacheName = 'site-static-v24';
const assets = [
    '/',
    '/pesquisav24/index.html',
    '/pesquisav24/styles.css',
    '/pesquisav24/script.js',
    '/pesquisav24/manifest.json',
    '/pesquisav24/images/icon-192x192.png',
    '/pesquisav24/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se disponível
        return response || fetch(event.request).then(async fetchResponse => {
          // Se o recurso for buscado com sucesso na rede, adicione-o ao cache
          const cache = await caches.open(cacheName);
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      })
  );
});