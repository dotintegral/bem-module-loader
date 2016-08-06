var loaderUtils = require("loader-utils");
var selectorParser = require("./selector-parser")

module.exports = function (content) {
  var callback = this.async();
  var bemify = loaderUtils.stringifyRequest(this, require.resolve("./bemify.js"))

  selectorParser(content)
    .then(function (bemifyParams) {
      var myContent = [
        'var bemify = require(' + bemify + ')',
        'var bem = bemify(' + JSON.stringify(bemifyParams) + ')',
        'module.exports = bem'
      ].join('\n')
      callback(null, myContent)
    })
}
