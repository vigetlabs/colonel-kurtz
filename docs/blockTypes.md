# Block Types

1. [Overview](#overview)
2. [Properties](#properties)
3. [Creating Block Types](#creating-block-types)
4. [Advanced Block Types](#advanced-block-types)

## Overview

As it pertains to Colonel Kurtz, a block type is a unique entry that
describes the editing experience for a block. When a block is created,
it will be assigned a `type` equal to the id of a Block Type.

## Properties

Property    | Description
----------- | -----------
id          | A unique identifier. Assigned to a block when it is created.
label       | A display name given to the block type in the interface.
component   | A React component used to edit a block of a given type.
types       | An array of other BlockType ids that may be created as children.
maxChildren | An integer specifying the maximum allowed children that may be created.
root        | Configures the BlockType to display in the menu unless specifically asked for using `types`. Defaults to true.
group       | When set, groups BlockTypes of the provided string name within the block menu selector.

## Creating Block Types

Block Types require a unique identifier and a React component
definition. They are added to Colonel Kurtz by passing in a
`blockTypes` property when making an instance:

```javascript
var blockTypes = [{
  id        : 'image',
  label     : 'Image',
  component : require('../addons/image')
}]
```

The `id` value must be unique (the `label` property _should_ be,
however it isn't formally validated). The `component` value requires a
bit more configuration.

Being a React Component, components only mandate a `render`
method. You can update the content for a block with the `onChange`
property that is sent down from the editor:

```javascript
var Textbox = React.createClass({

  // PropTypes allow you to validate properties coming into the component
  propTypes: {
    content  : React.PropTypes.object.isRequired,
    onChange : React.PropTypes.func.isRequired
  },

  render() {
    return <textarea onBlur={ this._onBlur } />
  },

  _onBlur(e) {
    this.props.onChange({
      text: e.currentTarget.textContent
    })
  }

})
```

Now that the `Textbox` component has been created, we can send it into
the available block types passed into a `ColonelKurtz` instance.

```javascript
var blockTypes = [{
  id        : 'text',
  label     : 'Textbox',
  component : Textbox
}]

let editor = new ColonelKurtz({
  el         : document.getElementById('app'),
  blockTypes : blockTypes
})
```

## Advanced Block Types

Block types can be as sophisticated as you wish. There technically
isn't anything to stop you from building a React app and assigning it
as a component definition. For an example of this, see [the ArsArsenal
photo gallery](https://github.com/vigetlabs/ars-arsenal).

ArsArsenal can operate as a stand-alone gallery, however it exposes a
"component" key that is useable by Colonel Kurtz:

```javascript
var blockTypes = [{
  id        : 'image',
  label     : 'Image',
  component : require('ars-arsenal').Component
}]
```
