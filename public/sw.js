const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v2';
const assets = [
    '/',
    'index.html',
    '/request.js',
    '/style.css',
    '/index.js',
    '/img/cloud.svg',
    '/img/day_image.svg',
    '/img/down.svg',
    '/img/night_image.svg',
    '/img/up.svg',
    'https://fonts.googleapis.com/css2?family=Raleway:wght@100;400;700&display=swap',
    'https://fonts.gstatic.com/s/raleway/v17/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2'
];
//installing service worker
self.addEventListener('install', evt => {
    evt.waitUntil(caches.open(staticCacheName).then(cache => {
            console.log('Assets Site', assets);
            cache.addAll(assets);
        }).catch((err) => {})
    )
});

//activate service worker
self.addEventListener('activate', evt =>{
    evt.waitUntil(
        caches.keys().then(keys => {
            return new Promise.all(keys
                .filter(key => (key !== staticCacheName && key !== dynamicCacheName))
                .map(key => caches.delete(key))
            )
        }).catch((error) =>{
            console.log("Still good");
        })
    );
});

self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                }).catch((err) => {
                    console.log('Searching...');
                })
            }).catch((err) => {
                console.log("Did not fetch because", err);
            });
        }).catch((err) => {})
    );
});