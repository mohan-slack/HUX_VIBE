const CACHE_NAME = 'hux-v2';
const STATIC_CACHE = 'hux-static-v2';
const DYNAMIC_CACHE = 'hux-dynamic-v2';

// Critical assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/images/logo.png',
  '/images/heroSection/hero-01.png',
  '/images/productImages/goldImages/gold01.png',
  '/images/productImages/tarnishImages/tarnish01.png'
];

// Install event - cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => {
        console.error('Cache install failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first with cache fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    fetch(request)
      .then(response => {
        // If network request succeeds, cache it and return
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put(request, responseClone);
            })
            .catch(error => {
              console.error('Cache put failed:', error);
            });
        }
        return response;
      })
      .catch(error => {
        // Network failed, try cache
        return caches.match(request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache and it's a navigation request, return index.html
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            // For other requests, return a basic error response
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          })
          .catch(cacheError => {
            console.error('Cache match failed:', cacheError);
            return new Response('Service unavailable', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});