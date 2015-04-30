# Menus

1. [Options](#options)
2. [Walk-through](#walk-through)
3. [onClick and isDisabled](#onclick-and-isdisabled)

## Options

Name       | Description
---------- | -----------
id         | A unique identifier, used to indicate selection
label      | A user friendly label to show in the menu UI
onClick    | Optionally, executed when an item is clicked
isDisabled | A predicate to determine if a menu item should be disabled

## Walk-through

Colonel Kurtz gives each block a menu. By default this menu allows a
user to change the position of a block or remove it.

Additional menu items can be added. This is handled within the
component definition for a block type. The following example
demonstrates how to add menu items; an additional example can be
found at `./example/blockTypes/Section.jsx`:

```javascript
let React = require('react')

module.exports = React.createClass({

  statics: {
    menu: [{
      id    : 'hello-world',
      label : 'Hello World'
    }]
  },

  menuWillSelect(item) {
    switch (item) {
      case 'hello-world':
        alert('Hello, world!')
        break
    }
  },

  render() {
    return <div>{ this.props.children }</div>
  }
})
```

There are several things going on here:

1. The UI for new menu items is described in the `statics` property of
   the React component.
2. Whenever a menu item is clicked, it will execute the
   `menuWillSelect` function on the component.
3. `menuWillSelect` is passed the `id` key of the specific menu item
   that is about to be selected.

## onClick and isDisabled

Menu items can also define an `onClick` and `isDisabled` field. Both
of these should be functions and are passed the specific editor and
block for the menu:

```javascript
// React Code
statics: {
  menu: [{
    id         : 'hello-world',
    label      : 'Hello World',
    onClick    : (editor, block) => alert(`My block is ${ block.id }`),
    isDisabled : (editor, block) => false
  }]
},
// React Code
```

At the time of writing, `onClick` and `isDisabled` only know about the
editor and block they are associated with. Any behavior that requires
knowledge of the specific component the menu is apart of should be
handled with `menuWillSelect()`.
