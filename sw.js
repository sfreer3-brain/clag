/* CLAG — service worker.
   Tiene una copia locale del gioco così parte anche senza rete. Quando
   cambia il gioco si cambia CACHE_VERSION: il vecchio contenuto viene
   eliminato al primo avvio utile e il telefono ricarica il file nuovo. */
const CACHE_VERSION = 'clag-v17';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png'
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE_VERSION)
      .then(c => c.addAll(FILES))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  /* La pagina si prende prima dalla rete: così un aggiornamento si vede
     subito. Se la rete non c'è, si usa la copia salvata. */
  if (req.mode === 'navigate') {
    ev.respondWith(
      fetch(req)
        .then(r => { const copy = r.clone();
          caches.open(CACHE_VERSION).then(c => c.put('./index.html', copy)).catch(() => {});
          return r; })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }
  ev.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      const copy = r.clone();
      caches.open(CACHE_VERSION).then(c => c.put(req, copy)).catch(() => {});
      return r;
    }).catch(() => hit))
  );
});
