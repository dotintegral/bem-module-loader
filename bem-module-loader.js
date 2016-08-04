var loaderUtils = require("loader-utils");

module.exports = function (content) {
  console.log('content')
  console.log(loaderUtils.stringifyRequest(this, require.resolve("css-loader/lib/css-base.js")))
  console.log(content)

  return content;
}

/*
  exports = module.exports = require("./../node_modules/css-loader/lib/css-base.js")();
  // imports


  // module
  exports.push([module.id, "._11FywWRhJ2BhX5iwP0hBBQ {\n  color: red;\n}\n", ""]);

  // exports
  exports.locals = {
  	"button1": "_11FywWRhJ2BhX5iwP0hBBQ"
  };
*/
