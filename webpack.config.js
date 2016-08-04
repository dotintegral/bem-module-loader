var ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssLoaders = [
  __dirname + '/bem-module-loader.js',
  'css-loader?module'
].join('!')

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
          // }, {
          //   test: /\.css$/,
          //   loader: "css-loader"
          }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(cssLoaders)
          }
        ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css")
    ]
}
