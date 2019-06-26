import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(registration => {
        console.log('Service worker installé ! 🎉')

        // Fetch the manifest.json
        fetchManifest('/manifest.json')
      })
      .catch(error => {
        console.error('Pas de service worker 😢', error)
      })
  } else {
    // App running normally without SW
  }
})

function fetchManifest(pathToResource) {
  fetch(pathToResource)
    .then(function(response) {
      console.log('Mise en cache du manifest.json 📜')
    })
    .catch(function(error) {
      console.log('Woops ! 🚫 Une erreur est survenue :', error);
    });
}