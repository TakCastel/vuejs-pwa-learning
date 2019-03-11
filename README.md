# VueJS Progressive web app learning

## Packages installation

We won't be using the cdn all the time, now we're going to install VueJS in our application and build it with webpack compiler (version 4).

Now we are going to install Vue in our project and all its dependencies :

### The Javascript framework :
```
npm install vue
```

### Webpack & Babel :

```
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
```

```
npm install @babel/core @babel/preset-env babel-loader --save-dev
``` 

### SFC's support

We need to tell webpack how to interprete the `template`, `script` and `style` parts of our single file in order to correctly mount our application.

```
npm install vue-template-compiler vue-loader  css-loader vue-style-loader --save-dev
```

Now the `package.json` should look like this :

```json
"dependencies": {
  "vue": "^2.6.8"
},
"devDependencies": {
  "@babel/core": "^7.3.4",
  "@babel/preset-env": "^7.3.4",
  "babel-loader": "^8.0.5",
  "css-loader": "^2.1.1",
  "html-webpack-plugin": "^3.2.0",
  "vue-loader": "^15.7.0",
  "vue-style-loader": "^4.1.2",
  "vue-template-compiler": "^2.6.8",
  "webpack": "^4.29.6",
  "webpack-cli": "^3.2.3",
  "webpack-dev-server": "^3.2.1"
}
```

## Create the files
Then we create our single file for our Vue application displaying a *Hello World* the same way we did before. Let's just add a bit of CSS to be sure the styles are imported correctly.

`App.vue` 
```html
<template>
  <div class="hello-world">
    Hello {{ message }}
  </div> 
</template>

<script>
export default {
  data: () => ({
    message: 'world !'
  })
}
</script>

<style>
  .hello-world {
    padding: 16px;
    color: red;
  }
</style>

```
`index.html`
```html
<!DOCTYPE html>
<html>
  <!-- Head tags -->
  <head>
    <meta charset="utf-8">
    <title>Mon app</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  
  <!-- Body of our app -->
  <body>
    Voici mon application :
    <div id="app" />
  </body>
</html>
```
`main.js`
```js
import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
});
```

## Configure Webpack

Copy the following webpack config in order to tell Webpack what to do with our application, then change the command line in the `package.json` file to launch the app.

`webpack.config.js`
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  devServer: {
    open: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ]
};
```

New script line in our `package.json` (we can replace the *test* script that won't be used in this course) : 
```
"dev": "webpack-dev-server --mode development"
```