// Simple runtime caching service worker for faster repeat loads
// Caches GET requests for static assets (images, CSS, JS, fonts) with a cache-first strategy.
// HTML navigations use a network-first strategy to ensure you get the latest page.

const VERSION = 'v1.1.0';
const RUNTIME = `runtime-${VERSION}`;
const NETWORK_TIMEOUT = 3000; // 3 second timeout for network requests

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

// Network timeout helper: race network request against a timeout
function fetchWithTimeout(request, timeout) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (isHTMLRequest(request)) {
    // Network-first for HTML with timeout; always try network first
    event.respondWith(
      fetchWithTimeout(request, NETWORK_TIMEOUT)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME).then((cache) => cache.put(request, copy));
            return response;
          }
          // If network response not ok, serve cached version
          return caches.match('/index.html');
        })
        .catch(() => {
          // Network failed or timed out, use cache
          return caches.match(request)
            .then(cached => cached || caches.match('/index.html'));
        })
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
