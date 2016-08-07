# bem-module-loader

## What's that?
`bem-module-loader` is a loader for `webpack` that allows to import [BEM](http://getbem.com/introduction/) based CSS files 
and use them inside JS code in a similar fashion to the one from [CSS Modules](https://github.com/css-modules/css-modules). 

# Why?
* Because some projects just can't be moved entirely to CSS Modules
* Using BEM's looooong selector names in JS code sucks

# Example

Let's assume, this is our BEM based stylesheet

    //styles.css
    .my-block__my-element--modifier {
      color: red;
    }

Load it and use

    //somefile.js
    import { myBlock } from 'styles.css'
    
    let myClass = myBlock().myElement().modifier()
    
    console.log(`<div class="${myClass}">My div content</div>`)
    // will print out <div class=".my-block__my-element--modifier">My div content</div>

# License
MIT
