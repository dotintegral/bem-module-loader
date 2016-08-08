var fs = require('fs')
var postcss = require('postcss')

var plugin = postcss.plugin('selector-parser', function selectorParser(options) {
  return function (css) {
    css.selectors = []
    css.walkRules(function (rule) {
      css.selectors.push.apply(css.selectors, rule.selector.split(/\s|>/))
    })
  }
});

var processor = postcss([plugin])

function getSimpleSelector(selector) {
  return selector.split(':')[0]
}

function getBlockObject(bem, inputBlock) {
  var block = getSimpleSelector(inputBlock)
  var blockObject = bem.filter(function (definition) {
    return definition.block === block
  })[0]

  if (blockObject === undefined) {
    blockObject = {
      block: block,
      elements: []
    }

    bem.push(blockObject)
  }

  return blockObject
}

function getElementObject(blockObject, inputElement) {
  var element = getSimpleSelector(inputElement)
  var elementObject = blockObject.elements.filter(function (definition) {
    return definition.element = element
  })[0]

  if (elementObject === undefined) {
    elementObject = {
      element: element,
      modifiers: []
    }

    blockObject.elements.push(elementObject)
  }

  return elementObject
}

function updateModifiers(elementObject, inputModifier) {
  var modifier = getSimpleSelector(inputModifier)
  
  if (elementObject.modifiers.indexOf(modifier) === -1) {
    elementObject.modifiers.push(modifier)
  }
}

function updateBemObject(bem, selector) {
  var splitted = selector.split(/__|--/)
  var block = splitted[0].slice(1)
  var element = splitted[1]
  var modifier = splitted[2]

  var blockObject = getBlockObject(bem, block)

  if (element !== undefined) {
    var elementObject = getElementObject(blockObject, element)

    if (modifier !== undefined) {
      updateModifiers(elementObject, modifier)
    }
  }

}

module.exports = function (style) {
  return processor
    .process(style)
    .then(function (result) {
      var bem = []
      result.root.selectors.forEach(function (selector) {
        if (selector.length) {
          updateBemObject(bem, selector)
        }
      })

      return bem
    })
}
