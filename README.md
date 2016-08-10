# BEM Module Loader

## What's that?
`bem-module-loader` is a loader for `webpack` that allows to import [BEM](http://getbem.com/introduction/) based CSS files 
and use them inside JS code in a similar fashion to the one from [CSS Modules](https://github.com/css-modules/css-modules).

It replaces [CSS Loader](https://github.com/postcss/postcss) and exctracts CSS styles on it's own, so there's no need for [Extract Text Plugin](https://github.com/webpack/extract-text-webpack-plugin)

## Why?
* Because some projects just can't be moved entirely to CSS Modules
* Using BEM's looooong selector names in JS code sucks

## Example

Let's assume, this is our BEM based stylesheet

```css
//styles.css
.my-block__my-element--modifier {
  color: red;
}
```

Load it and use

```js
//somefile.js
import { myBlock } from 'styles.css'

let myClass = myBlock().myElement().modifier()

console.log(`<div class="${myClass}">My div content</div>`)
// will print out <div class="my-block__my-element my-block__my-element--modifier">My div content</div>
```

## Options
* `path` (required) - directory of the build output (usually same as webpack's)
* `filename` (required) - name of the output file (i.e. `styles.css`)
* `minify` (optional) - whether minify the output CSS code


## Features

### camelCaseifies class names

Turns hyphen based naming

```css 
.registration-form__submit-button--active-and-glowing 
```

Into sexy camelCase

```js
registrationForm().submitButton().activeAndGlowing()
```

### Chainable

```js
import { navigation } from 'navigation.css'

let buttonStyle = navigation().button()

if (isRed()) {
  buttonStyle = buttonStyle().red()
}

if (isBig()) {
  buttonStyle = buttonStyle().big()
}

if (isClickable()) {
  buttonStyle = buttonStyle().clickable()
}

console.log(buttonStyle)
// Depending on the combination of the conditions, buttonStyle content might be:
// "navigation__button" (no conditions met)
// "navigation__button navigation__button--big" (isBig condition met)
// "navigation__button navigation__button--red navigation__button--big navigation__button--clickable" (all conditions met)
```
### Reliable
Because `bem-module-loader` generates JS objects in compilation phase, it will contain only existing methods!

```js
var buttonStyle = navigation().batton()
// Will throw: Uncaught TypeError: batton is not a function
```

### Works well with other CSS processors
[sass-loader](https://github.com/jtangelder/sass-loader), [less-loader](https://github.com/webpack/less-loader), [PostCSS](https://github.com/postcss/postcss) and basically every other CSS processor will work with `bem-module-loader`, as long as it will produce a valid BEM stylesheet.


## Limitations

* Supports only `block__element--modifier` order, `block--modifier__element`, although valid BEM name, is not yet supported.


## License
MIT
