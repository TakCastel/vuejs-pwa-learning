// Import plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Export webpack conf
module.exports = {
  entry: './src/main.js',
  module: {
    // What to do with different type of files
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  devServer: {
    open: true, // Automatically open the browser on launch command
    hot: true, // Watch for any change and hot reload the app
  },
  // Use imported plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ]
};