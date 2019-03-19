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
      })
      .catch(error => {
        console.error('Pas de service worker 😢', error)
      })
  } else {
    // App running normally without SW
  }
})