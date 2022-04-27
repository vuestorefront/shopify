export default async({ $cookies, $config }) => {
  if ('serviceWorker' in navigator) {
    if ($config.appVersion !== $cookies.get('AppVer')) {
      await navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      }).catch((err) => {
        console.log('Service Worker registration failed: ', err);
      });
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      }).then(() => {
        $cookies.set('AppVer', $config.appVersion, { maxAge: 60 * 60 * 24 * 365 });
        // register service worker
        navigator.serviceWorker.register('/sw.js');
      });
    }
  }
}
