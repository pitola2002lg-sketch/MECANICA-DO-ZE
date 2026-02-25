const CACHE_NAME = 'mecanica-ze-v1';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// install
self.addEventListener('install', e=>{
 e.waitUntil(
  caches.open(CACHE_NAME).then(cache=>{
   return cache.addAll(FILES_TO_CACHE);
  })
 );
 self.skipWaiting();
});

// activate
self.addEventListener('activate', e=>{
 e.waitUntil(
  caches.keys().then(keys=>{
   return Promise.all(
    keys.filter(k=>k!==CACHE_NAME)
    .map(k=>caches.delete(k))
   );
  })
 );
 self.clients.claim();
});

// fetch
self.addEventListener('fetch', e=>{
 e.respondWith(
  caches.match(e.request).then(res=>{
   return res || fetch(e.request);
  })
 );
});
