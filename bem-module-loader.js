var promisify = require('promisify-node')
var path = require('path')
var loaderUtils = require("loader-utils");
var selectorParser = require("./selector-parser")
var postcss = require('postcss')
var cssnano = require('cssnano')

var fs = promisify('fs')

module.exports = function (content) {
  var callback = this.async();
  var bemify = loaderUtils.stringifyRequest(this, require.resolve("./bemify.js"))
  var options = loaderUtils.parseQuery(this.query)
  var file = path.join(options.path, options.filename)
  var parseSelectors = selectorParser.bind({}, content)


  var createModule = function (bemifyParams) {
    var myContent = [
      'var bemify = require(' + bemify + ')',
      'var bem = bemify(' + JSON.stringify(bemifyParams) + ')',
      'module.exports = bem'
    ].join('\n')

    callback(null, myContent)
  }

  var saveOutput = function (css) {
    return fs.appendFile(file, css)
  }

  var processCss = function () {
    if (options.minify) {
      return postcss([cssnano])
        .process(content)
        .then(function (result) {
          return result.css
        })
    } else {
      return Promise.resolve(content)
    }
  }

  processCss()
    .then(saveOutput)
    .then(parseSelectors)
    .then(createModule)
}
