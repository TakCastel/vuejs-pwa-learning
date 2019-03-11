# VueJS Progressive web app learning

## Introduction

This repo is used to learn how to build a progressive web app in VueJS application. The repo branches are following the chapters. Please note that the README.md will be changed every chapter to explain what's going on in the project.

Please check this slide in order to follow the course (FR only) :
- [VueJS Progressive Webapp course slides (french)](https://slides.com/takcastel/vue-js-6/live#/)
- VueJS Progressive Webapp course slides (english not supported yet)

### Get the project
```
git clone git@github.com:TakCastel/vuejs-pwa-learning.git
```

### Prerequisite

- Basics of HTML, CSS and JS
- Node latest version / npm
- Correct IDE (VSC suggested)
- VueDevtools browser extension
- EcmaScript 5 compliant browser

## Greetings with Vue

We are going to install a vue application with the CDN. First of all let's prepare our folder and initiate our npm project with the following command :

```
npm init
``` 

Once it's done, we first can understand the vue reactive framework by playing with these two files :

`index.html` :
```html
<!DOCTYPE html>
<html>
  <!-- Head tags -->
  <head>
    <meta charset="utf-8">
    <title>Titre de mon application</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  
  <!-- Body of our app -->
  <body>
    <div id="app">
      Hello {{ message }}
    </div>

    <script src="https://unpkg.com/vue"></script>
    <script src="./main.js"></script>
  </body>
</html>
```
`main.js` :
```js
new Vue({
  el: '#app',
  data: {
    message: 'world !'
  }
})
```