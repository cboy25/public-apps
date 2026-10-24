// 書類スキャナ: OpenCV.js とアプリ本体を端末に保存し、電波がない場所でも使えるようにする
const CACHE = 'doc-scanner-v1';
const CV_URL = 'https://cdn.jsdelivr.net/npm/@techstark/opencv-js@4.10.0-release.1/dist/opencv.js';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => e.waitUntil((async () => {
  for(const k of await caches.keys()) if(k.startsWith('doc-scanner-') && k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  if(req.url === CV_URL){
    // バージョン固定のURLなので、一度保存したら以後は端末から読む
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      if(hit) return hit;
      const res = await fetch(req);
      if(res.ok) await c.put(req, res.clone());
      return res;
    }));
    return;
  }
  if(new URL(req.url).origin === self.location.origin){
    // アプリ本体は最新版を優先し、圏外のときだけ保存分を使う
    e.respondWith(fetch(req).then(res => {
      if(res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch:true})));
  }
});
