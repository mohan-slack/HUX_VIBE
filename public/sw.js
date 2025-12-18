const CACHE_NAME = 'hux-v1';
const urlsToCache = [
  '/',
  '/images/logo.png',
  '/images/heroSection/hero-01.png',
  '/images/heroSection/hero-02.png',
  '/images/heroSection/hero-03.png',
  '/images/productImages/goldImages/gold01.png',
  '/images/productImages/tarnishImages/tarnish01.png',
  '/images/features/sleep.jpg',
  '/images/features/HRV.png',
  '/images/features/smart.png',
  '/images/features/Yoga.png',
  '/images/features/Intense.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});