# VueJS Progressive web app learning

## Why hosting ?

According to Google recommendations, the webapp needs to be served over HTTPS in order to register the service worker. It is mandatory to make the webapp be registered as a progressive webapp and implements many options (add to homescreen, manifest, service worker, offline support)

## Production build 

In order to test our application and register a service worker, we need to build our app.

Let's add a new script in our package.json and set the mode to production in our webpack config :

`"build": "webpack"`

```js
module.exports = {
  mode: 'production'
}
```

Then we prepare the files for our service-worker and allow webpack to bundle it. Specify the entry point and output as below :

```js
  entry: {
    main: './src/main.js',
    sw: './src/service-worker.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
```
This code will get the Javascript file and bundle them as `main.js` and `sw.js` and put them in the root of our dist folder.

## Host with Firebase

Install Firebase CLI :
`npm install -g firebase-tools``

Initialize application
`firebase init`

Chose only hosting and host it in a new project. Dont forget to login into Firebase and add the project :
`firebase use --add`

To deploy the application, build it with the script we previously added and deploy to firebase. 

You can also create a custom script :
`"deploy": "npm run build && firebase deploy"`

## Register a service worker

When the window is loaded, we can register our service worker. For this, we need to wite a new code inside our `main.js` :

```js
window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js') // Target the dist file
      .then(registration => {
        console.log('Service worker installé ! 🎉')
      })
      .catch(error => {
        console.error('Pas de service worker 😢', error)
      })
  } else {
    // App running normally without SW
  }
})
```

## Add a manifest

A manifest is usefull to control how your application behave when opened by the user. Background color, name, icon used by the OS, and many other parameters.

Place the manifest.json in your app with an icon :

```json
{
  "name": "Mon application",
  "short_name": "App",
  "theme_color": "#2196f3",
  "background_color": "#2196f3",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "/icon.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
```

## Fetch the manifest in service worker

According to the [official documentation](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api), we need to fetch the manifest.json in order to launch the install to homescreen button.

In your main.js, this function is called when the service worker is registered :

```js
function fetchManifest(pathToResource) {
  fetch(pathToResource)
    .then(function(response) {
      console.log('Mise en cache du manifest.json 📜')
    })
    .catch(function(error) {
      console.log('Woops ! 🚫 Une erreur est survenue :', error);
    });
}
```

Then, in the service worker, we have to cache the file using the cache API. For now we will just copy/paste what we can read in the documentation :

```js
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );
});
``` 

## Clear cache when deploying to firebase

During your test, Firebase may use older versions of your app, if you need to clear the cache of your application when deploying, you can add this in your firebase.json : 

```json
"hosting": {
  "headers": [
    { 
      "source":"/sw.js", 
      "headers": [
        {
          "key": "Cache-Control", 
          "value": "no-cache"
        }
      ] 
    }
  ]
}
```

## Extra script for our test

Webpack won't build the manifest and icon files we put in the static folder. For now, we can use these scripts in our package.json to build it and allow the code to access the new files :

```json
  "manifest": "cp static/manifest.json dist/manifest.json",
  "icon": "cp static/icon.png dist/icon.png",
  "build": "webpack && npm run manifest && npm run icon"
```

## Run audit in browser

The app should now be installable and fully reliable ! :)