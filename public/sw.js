// Simple runtime caching service worker for faster repeat loads
// Caches GET requests for static assets (images, CSS, JS, fonts) with a cache-first strategy.
// HTML navigations use a network-first strategy to ensure you get the latest page.

const VERSION = 'v1.0.1';
const RUNTIME = `runtime-${VERSION}`;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  // Pre-cache the app shell (index.html) for SPA navigations
  event.waitUntil(
    caches.open(RUNTIME).then((cache) => cache.addAll(['/','/index.html']).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== RUNTIME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

function isHTMLRequest(request) {
  const dest = request.destination;
  return dest === 'document' || (request.mode === 'navigate');
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return /\.(?:js|css|webp|png|jpe?g|gif|svg|woff2?|ttf|eot)$/i.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (isHTMLRequest(request)) {
    // Network-first for HTML; fallback to cached app shell to support SPA routes
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME).then((cache) => cache.put(request, copy));
            return response;
          }
          // If GitHub Pages returns 404 page for deep link, serve app shell instead
          return caches.match('/index.html');
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  if (isStaticAsset(request)) {
    // Cache-first for static assets
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // Update the cache in the background
          fetch(request).then((response) => {
            caches.open(RUNTIME).then((cache) => cache.put(request, response));
          }).catch(() => {});
          return cached;
        }
        return fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME).then((cache) => cache.put(request, copy));
          return response;
        }).catch(() => caches.match(request));
      })
    );
  }
});
