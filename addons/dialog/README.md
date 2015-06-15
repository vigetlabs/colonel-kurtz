# Dialog

1. [Overview](#overview)
2. [Integration](#integration)
3. [Properties](#properties)

## Overview

The Dialog is an accessible modal designed with Colonel Kurtz in
mind. It was originally designed to allow for additional settings on a
block that might not be important to always display (see the Menu API
for more information)

## Integration

The Dialog is not a BlockType, merely a React component designed for
Colonel Kurtz:

```javascript
let MyBlockTypeComponent = React.createClass({
  open() {
    this.setState({ open: true })
  },
  close() {
    this.setState({ open: false })
  },
  render() {
    return (
      <div>
        <button onClick={ this.open }>Open</button>
        <Dialog title="Settings" active={ this.state.open } onExit={ this.close }>
          <p>You can use dialogs such as these to hide more stuff</p>
          <button onClick={ this.close }>Close</button>
        </Dialog>
      </div>
    )
  }
})

## Properties

```
active: Should the dialog display?
className: Defaults to `col-dialog`
headingComponent: The React component or DOM element to use as the header
title: An optional title to include with the Dialog
onExit: Triggers whenever the background of a Dialog is clicked or escape is pressed
```
