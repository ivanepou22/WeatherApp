if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then((reg) => console.log("Service Worker Registered", reg)) //this a promise syntax has to deal with asynchronous calls
    .catch((err) => console.log("Service Worker not Registered", err));
}