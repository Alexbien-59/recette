/* ════════════════════════════════════════════════════════════════════════
   MaRecette — Service Worker
   URL de production : https://<votre-compte>.github.io/marecette/
   Stratégie : Cache First — hors ligne après la première visite
   ════════════════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'marecette-v1';

const ASSETS = [
  '/marecette/',
  '/marecette/index.html',
  '/marecette/manifest.json',
  '/marecette/icon-192.png',
  '/marecette/icon-512.png',
];

// Installation : mise en cache de l'app shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    }).then(function() { return self.skipWaiting(); })
  );
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

// Fetch : Cache First
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
        return response;
      }).catch(function() {
        return new Response(
          '<html><body style="background:#FDFAF5;color:#C4622D;font-family:sans-serif;text-align:center;padding:60px"><h2>🍳 MaRecette</h2><p>Vous êtes hors ligne.<br>Ouvrez l\'app une première fois en ligne pour activer le mode hors ligne.</p></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      });
    })
  );
});
