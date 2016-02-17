# Menus

1. [Options](#options)
2. [Overview](#overview)
3. [onClick and isDisabled](#onclick-and-isdisabled)

## Options

Name       | Description
---------- | -----------
id         | A unique identifier, used to indicate selection
label      | A user friendly label to show in the menu UI
onClick    | Optionally, executed when an item is clicked
isDisabled | A predicate to determine if a menu item should be disabled

## Overview

Colonel Kurtz gives each block a menu. By default this menu allows a
user to change the position of a block or remove it.

Additional menu items can be added. This is handled within the
component definition for a block type. The following example
demonstrates how to add menu items; an additional example can be
found at `./example/blockTypes/Section.jsx`:

```javascript
let React = require('react')

module.exports = React.createClass({

  getMenuItems() {
    return [{
      id      : 'hello-world',
      label   : 'Hello World',
      onClick : (editor, block, menuItem) => alert("Hello, world!")
    }]
  },

  render() {
    return <div>{ this.props.children }</div>
  }
})
```

There are several things going on here:

1. The UI for new menu items is described in the `getMenuItems` method
2. Whenever a menu item is clicked, it will execute the `onClick` option

## onClick and isDisabled

Menu items can also define an `onClick` and `isDisabled` field. Both
of these should be functions and are passed the specific editor and
block for the menu:

```javascript
getMenuItems() {
  return [{
    id         : 'hello-world',
    label      : 'Hello World',
    onClick    : (editor, block, menuItem) => alert(`My block is ${ block.id }`),
    isDisabled : (editor, block, menuItem) => false
  }]
}
```
