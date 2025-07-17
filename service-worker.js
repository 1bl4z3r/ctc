const CACHE = 'ctc-cache-v1';
const urls = [
  // Core files
  '/',
  'index.html',
  'index.css',
  'index.js',
  'CountryCodes.json',
  'site.webmanifest',
  'identity/browserconfig.xml',

  // Icons from manifest
  'identity/android-chrome-36x36.png',
  'identity/android-chrome-48x48.png',
  'identity/android-chrome-72x72.png',
  'identity/android-chrome-96x96.png',
  'identity/android-chrome-144x144.png',
  'identity/android-chrome-192x192.png',
  'identity/android-chrome-256x256.png',
  'identity/android-chrome-512x512.png',
  'identity/maskable-icon-512x512.png',

  // Icons from index.html & browserconfig
  'identity/apple-touch-icon.png',
  'identity/favicon-32x32.png',
  'identity/favicon-16x16.png',
  'identity/mstile-150x150.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urls))
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});