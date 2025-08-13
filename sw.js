const VERSION = '3.0.0';
const CACHE = `cinematix-${VERSION}`;
const CORE = [
  './','./index.html','./manifest.webmanifest',
  './pwa-icon-192.png','./pwa-icon-512.png','./apple-touch-icon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k.startsWith('cinematix-') && k!==CACHE ? caches.delete(k) : null))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if(e.request.method!=='GET') return;
  e.respondWith((async()=>{
    const cached = await caches.match(e.request);
    if (cached) return cached;
    try{
      const res = await fetch(e.request);
      const c = await caches.open(CACHE); c.put(e.request, res.clone());
      return res;
    }catch(err){
      return caches.match('./index.html');
    }
  })());
});
self.addEventListener('message', e => {
  if(e.data && e.data.type==='SKIP_WAITING') self.skipWaiting();
});