var cacheName = 'christianfei:0002'
var cacheFiles = ['/', '/about/', '/posts/']

self.addEventListener('install', function (event) { event.waitUntil(caches.open(cacheName).then(function (cache) { return cache.addAll(cacheFiles) })) })
self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    if (response) { return response }
    return fetch(event.request)
  })
    .catch(function () {
      return caches.match('/offline/')
    }))
})
self.addEventListener('activate', function (event) {
  var cacheWhitelist = ['christianfei:0002']
  event.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (cacheWhitelist.indexOf(cacheName) === -1) {
        return caches.delete(cacheName)
      }
    }))
  }))
})
