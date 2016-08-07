var promisify = require('promisify-node')
var path = require('path')
var loaderUtils = require("loader-utils");
var selectorParser = require("./selector-parser")

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


  fs.appendFile(file, content)
    .then(parseSelectors)
    .then(createModule)
}
