# Colonel Kurtz Style

1. [Overview](#overview)
2. [Structure](#structure)
3. [Conventions](#conventions)

## Overview

**Colonel Kurtz** uses the `scss` syntax for
[Sass](http://sass-lang.com/). Where applicable, the
[Material Design](http://www.google.com/design/spec/material-design/introduction.html)
guidelines is followed. This is largely a maintenance effort, so that
multiple developers working on Colonel Kurtz have a common style guide
to work from.

## Structure

To help fight specificity, all styles are wrapped in the `.colonel`
selector. Additionally components are prefixed with `.col-` to prevent
accidental collisions with existing styles.

With that in mind, the file structure can be described as:

```
style
├── animations : CSS Animations
├── components : Styles unique to a particular type of component
├── generators : Placeholder selectors, functions, and mixins
├── reset.scss : Normalizes a few generic styles
└── values     : Common variables, such as sizes and colors
```

## Conventions

See the style section of CONTRIBUTING.md
