// NOTE: ASSETSの中身（index.html/record.html以外の manifest.json やアイコンなど）を変更したときは、
// このCACHE_NAMEの数字を必ず上げること。上げないとブラウザがsw.jsの更新に気づかず、古いキャッシュが残り続ける。
const CACHE_NAME = 'work-log-organizer-v4';
const ASSETS = [
  './index.html',
  './record.html',
  './settings.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const isPage = e.request.mode === 'navigate' || e.request.destination === 'document';
  if(isPage){
    // ページ本体はネット接続時は常に最新を取得し、キャッシュも更新する。オフライン時のみキャッシュにフォールバック。
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  // アイコンなど変化の少ないファイルはキャッシュ優先（速度・オフライン安定性のため）
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
