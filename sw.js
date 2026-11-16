const C='smartbiz-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||/googleapis\.com$/.test(u.hostname))return;
e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(r),net=fetch(r).then(x=>{if(x.ok||x.type==='opaque')c.put(r,x.clone());return x}).catch(()=>hit);return hit||net}))});
