if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
}
self.addEventListener('fetch', function() {});
