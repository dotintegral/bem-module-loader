function renameToCamelCase(name) {
  return name
    .split('-')
    .map(function (part, index) {
      if (index > 0) {
        return part.charAt(0).toUpperCase() + part.slice(1)
      } else {
        return part
      }
    })
    .join('')
}


function createModifier(prefix, modifier, string, modifiers) {
  return function () {
    var toString = function() {
      return string + ' ' + prefix + '--' + modifier
    }

    var result = {}

    modifiers.forEach(function (mod) {
      result[renameToCamelCase(mod)] = createModifier(prefix, mod, toString(), modifiers)
    })

    result.toString = toString

    return result
  }
}


function createElement(block, element, modifiers) {
  return function () {
    var toString = function () {
      return block + '__' + element
    }

    var result = {}

    modifiers.forEach(function (mod) {
      result[renameToCamelCase(mod)] = createModifier(toString(), mod, toString(), modifiers)
    })

    result.toString = toString

    return result
  }
}


function createBlock(block, elements) {
  return function () {
    var toString = function () {
      return block
    }

    var result = {}

    elements.forEach(function (el) {
      result[renameToCamelCase(el.element)] = createElement(block, el.element, el.modifiers)
    })

    result.toString = toString
    return result
  }
}


function bemify(blocks) {
  var result = {}

  blocks.forEach(function (block) {
    result[renameToCamelCase(block.block)] = createBlock(block.block, block.elements)
  })

  return result
}

module.exports = bemify
