const CACHE_NAME_CORE = "cacheWS-v1";
const CACHE_FILES_CORE = [
  "/",
  "/index.html",
  "/src/index.js",
  "/src/index.css",
  "/src/components/SensorsCheckbox.js",
  "/src/components/CardSensor.js",
  "/src/components/IconTheme.js",
  "/src/firebase.js",
];

const CACHE_NAME_INMUTABLE = "inmutableWS-v1";
const CACHE_FILES_INMUTABLE = [

];

const CACHE_NAME_DYNAMIC = "dynamicWS-v1";
const CACHE_FILES_DYNAMIC = [];

self.addEventListener("install", event => {
  const saveCache = caches.open(CACHE_NAME_CORE)
    .then(cache => cache.addAll(CACHE_FILES_CORE))
    .catch(err => console.log(err));
  const saveCacheI = caches.open(CACHE_NAME_INMUTABLE)
    .then(cache => cache.addAll(CACHE_FILES_INMUTABLE))
    .catch(err => console.log(err));
  self.skipWaiting();
  event.waitUntil(Promise.all([saveCache, saveCacheI]));
});

self.addEventListener("activate", event => {
  console.log("SW activado");
});

self.addEventListener("fetch", event => {
  if (!(event.request.url.indexOf("http") === 0)) {
    return;
  }

  const cacheWithNet = caches.open(CACHE_NAME_CORE)
    .then(cache => {
      return fetch(event.request)
        .then(response => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(err => {
          return cache.match(event.request);
        });
    });
});
