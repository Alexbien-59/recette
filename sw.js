/* ════════════════════════════════════════════════════════════════════════
   MaRecette — Service Worker
   Stratégie : Cache First — hors ligne après la première visite.

   IMPORTANT : on utilise self.registration.scope pour construire les
   chemins dynamiquement. Cela rend le SW indépendant du nom du dépôt
   GitHub (marecette, MaRecette, ma-recette, peu importe).
   ════════════════════════════════════════════════════════════════════════ */

const CACHE_VERSION = 'marecette-v2';

/* Les assets sont résolus au moment de l'installation, quand
   self.registration.scope est connu (ex: https://user.github.io/repo/).
   On n'utilise PLUS de chemins absolus codés en dur.              */
function getAssets() {
  const base = self.registration.scope;
  return [
    base,
    base + 'index.html',
    base + 'manifest.json',
    base + 'icon-192.png',
    base + 'icon-512.png',
  ];
}

/* ── Installation ─────────────────────────────────────────────────────── */
self.addEventListener('install', function(event) {
  console.log('[SW] Installation, scope :', self.registration.scope);
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function(cache) {
        return cache.addAll(getAssets());
      })
      .then(function() {
        /* Force l'activation immédiate sans attendre la fermeture des onglets */
        return self.skipWaiting();
      })
      .catch(function(err) {
        console.error('[SW] Échec de la mise en cache :', err);
      })
  );
});

/* ── Activation ───────────────────────────────────────────────────────── */
self.addEventListener('activate', function(event) {
  console.log('[SW] Activation');
  event.waitUntil(
    caches.keys()
      .then(function(keys) {
        return Promise.all(
          keys
            .filter(function(key) { return key !== CACHE_VERSION; })
            .map(function(key) {
              console.log('[SW] Suppression ancien cache :', key);
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        /* Prend le contrôle de tous les onglets ouverts immédiatement */
        return self.clients.claim();
      })
  );
});

/* ── Fetch : Cache First ──────────────────────────────────────────────── */
self.addEventListener('fetch', function(event) {
  /* Ignorer les requêtes non-GET */
  if (event.request.method !== 'GET') return;

  /* Ignorer les requêtes vers des origines tierces (Google Fonts, CDN…)
     sauf si elles sont déjà dans le cache                               */
  var url = new URL(event.request.url);
  var isThirdParty = url.origin !== self.location.origin;

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      /* Ressource trouvée en cache → on la sert directement (rapide + hors ligne) */
      if (cached) return cached;

      /* Pas en cache → réseau */
      return fetch(event.request).then(function(response) {
        /* Ne pas mettre en cache les réponses invalides ou les ressources tierces */
        if (!response || response.status !== 200 || isThirdParty) {
          return response;
        }
        /* Cloner : la réponse réseau ne peut être consommée qu'une fois */
        var toCache = response.clone();
        caches.open(CACHE_VERSION).then(function(cache) {
          cache.put(event.request, toCache);
        });
        return response;

      }).catch(function() {
        /* Hors ligne et pas en cache → page de repli minimaliste */
        return new Response(
          [
            '<!DOCTYPE html><html lang="fr"><head>',
            '<meta charset="UTF-8">',
            '<meta name="viewport" content="width=device-width,initial-scale=1">',
            '<title>MaRecette — Hors ligne</title>',
            '<style>',
            'body{font-family:sans-serif;background:#FDFAF5;color:#C4622D;',
            'display:flex;flex-direction:column;align-items:center;',
            'justify-content:center;min-height:100vh;text-align:center;padding:24px}',
            'h2{font-size:28px;margin-bottom:12px}',
            'p{color:#6B5D4F;max-width:320px;line-height:1.6}',
            '</style></head><body>',
            '<h2>🍳 MaRecette</h2>',
            '<p>Vous êtes hors ligne.<br>',
            'Ouvrez l\'application une première fois en ligne ',
            'pour activer le mode hors ligne.</p>',
            '</body></html>'
          ].join(''),
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      });
    })
  );
});
