var loaderUtils = require("loader-utils");

module.exports = function (content) {
  var bemObject = loaderUtils.stringifyRequest(this, require.resolve("./bemify.js"))

  var bemifyParams = [{
      block: 'navigation',
      elements: [{
        element: 'my-button',
        modifiers: [
          'red',
          'blue',
          'other-yellow-color'
        ]
      }, {
        element: 'label',
        modifiers: [
          'red',
          'blue',
          'yellow'
        ]
      }]
    }]

  var myContent = [
    'var bemify = require(' + bemObject + ')',
    'var bem = bemify(' + JSON.stringify(bemifyParams) + ')',
    'module.exports = bem'
  ].join('\n')

  return myContent;
}
