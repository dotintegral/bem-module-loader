module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/build/',
    filename: "bundle.js",
    publicPath: 'http://localhost:8090/assets'
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-object-assign'],
          presets: ['react', 'es2015']
        }
      }, {
        test: /\.css$/,
        loader: __dirname + '/../bem-module-loader.js',
        query: {
          path: __dirname + '/build/',
          filename: 'bundle.css',
          minify: true
        }
      }]
  }
}
