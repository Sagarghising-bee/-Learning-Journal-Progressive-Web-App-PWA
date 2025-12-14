const CACHE_NAME = 'journal-debug-v1';

// 1. Only cache the ABSOLUTE ESSENTIALS first to ensure it works.
// We can add the JS/CSS files back once HTML is working.
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/journal.html',
  '/projects.html',
  '/about.html',
  '/static/css/style.css',
  '/static/js/script.js',
  '/manifest.json'
];

// 2. Install: Cache files individually so we know what fails
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[SW] Cache opened. Attempting to cache files...');

      // We loop through files to catch errors
      for (const url of ASSETS_TO_CACHE) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          await cache.put(url, response);
          console.log(`[SW] Successfully cached: ${url}`);
        } catch (error) {
          console.error(`[SW] FAILED to cache: ${url}`, error);
          // If a file fails, we don't crash the whole worker,
          // but you MUST fix the file path or the app won't work offline.
        }
      }
    })
  );
  self.skipWaiting();
});

// 3. Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// 4. Fetch: Network First, Cache Fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // Fallback to Home if page is missing
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/');
          }
        });
      })
  );
});

