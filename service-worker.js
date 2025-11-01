
const CACHE_NAME = 'loopalingua-v6-2';
const ASSETS = ['./','./index.html','./manifest.json','./loopalingua-icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil((async () => { const keys = await caches.keys(); await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))); })()); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith((async () => { const cached = await caches.match(e.request); if (cached) return cached; try { const net = await fetch(e.request); return net; } catch(err){ return cached || Response.error(); } })()); });
