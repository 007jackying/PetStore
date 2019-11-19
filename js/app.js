if(!window.Promise) {
    window.Promise = Promise;
}

if('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
        console.log('Service worker Registered');
    }).catch(function(err){
        console.log("Error occured ", err)
    });
}