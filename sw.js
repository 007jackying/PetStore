var STATIC_CACHE_NAME = "static_v1";
var DYNAMIC_CACHE_NAME = "dynamic_v1";

self.addEventListener('install', function(event){
    console.log('[Service Worker] Installation... ', event);
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
        .then(function(cache) {
            cache.addAll([
                '/',
                '/index.html',
                '/js/app.js',
                '/js/promise.js',
                '/js/fetch.js',
                '/js/popper.min.js',
                '/js/jquery-3.4.0.min.js',
                '/js/bootstrap.min.js',
                '/js/mdb.min.js',
                'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
                '/css/bootstrap.min.css',
                '/css/mdb.min.css',
                '/css/style.css',
                '/css/custom.css'
            ]);
        })
    )
});

self.addEventListener('activate', function(event){
    console.log('[Service Worker] Activating ...', event);
    event.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key){
                if(key != STATIC_CACHE_NAME && key != DYNAMIC_CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    )
    return self.clients.claim();
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response) {
                return response;
            } else {
                return fetch(event.request).then(function(res){
                    return caches.open(DYNAMIC_CACHE_NAME).then(function(cache){
                        cache.put(event.request.url, res.clone());
                        return res;
                    })
                })
                .catch(function(err){
                    console.log("Error occured ", err);
                });
            }
        })
    );
})