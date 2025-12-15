/* ======================================================
   Service Worker - RT 外觀抽檢紀錄表
   支援：離線使用、快取、PWA 啟動
====================================================== */

const CACHE_NAME = "rt-inspection-cache-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./main.js",
    "./i18n.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

/* ======================================================
   Install：建立快取
====================================================== */
self.addEventListener("install", (event) => {
    console.log("[ServiceWorker] Install");

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[ServiceWorker] Pre-caching assets");
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

/* ======================================================
   Activate：清除舊快取
====================================================== */
self.addEventListener("activate", (event) => {
    console.log("[ServiceWorker] Activate");

    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("[ServiceWorker] Removing old cache", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

/* ======================================================
   Fetch：離線模式支援
====================================================== */
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // 若有快取 → 先用快取
            return response || fetch(event.request);
        })
    );
});
