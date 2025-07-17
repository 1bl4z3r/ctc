const CACHE_VERSION = 'v2';
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-cache-${CACHE_VERSION}`;

// List all resources you want to precache here:
const PRECACHE_URLS = [
  '/ctc/',
  '/ctc/index.html',
  '/ctc/offline.html',
  '/ctc/index.css',
  '/ctc/index.js',
  '/ctc/CountryCodes.json',
  '/ctc/site.webmanifest',
  '/ctc/identity/browserconfig.xml',
  '/ctc/identity/android-chrome-36x36.png',
  '/ctc/identity/android-chrome-48x48.png',
  '/ctc/identity/android-chrome-72x72.png',
  '/ctc/identity/android-chrome-96x96.png',
  '/ctc/identity/android-chrome-144x144.png',
  '/ctc/identity/android-chrome-192x192.png',
  '/ctc/identity/android-chrome-256x256.png',
  '/ctc/identity/android-chrome-512x512.png',
  '/ctc/identity/maskable-icon-512x512.png',
  '/ctc/identity/apple-touch-icon.png',
  '/ctc/identity/favicon-32x32.png',
  '/ctc/identity/favicon-16x16.png',
  '/ctc/identity/mstile-150x150.png'
];

// Install: cache the application shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => !currentCaches.includes(key))
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, then network, then fallback
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1) Navigation requests → App Shell (index.html) or offline.html
  if (event.request.mode === 'navigate' && url.origin === location.origin) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Network first for navigations
          return caches.open(STATIC_CACHE).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          console.log("nav offline")
          return caches.match('/ctc/offline.html')
        })
    );
    return;
  }

  // 2) Static resources → Cache-first
  if (PRECACHE_URLS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
    return;
  }

  // 3) Dynamic requests (APIs, JSON, others) → Stale-while-revalidate
  event.respondWith(
    caches.open(RUNTIME_CACHE).then(cache =>
      cache.match(event.request).then(cachedResponse => {
        const networkFetch = fetch(event.request)
          .then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          .catch(() => { /* network failed; we’ll return cachedResponse if present */ });

        // Return cached if available, otherwise wait for network
        return cachedResponse || networkFetch;
      })
    )
  );
});