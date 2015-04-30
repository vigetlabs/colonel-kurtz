let React = require('react')

class BlockType {

  constructor({ component, menuItems, label, types, id }) {
    if (typeof component === 'object') {
      component = React.createClass(component)
    }

    this.id        = id
    this.label     = label
    this.types     = types || []
    this.component = component
    this.menuItems = menuItems
  }

  valueOf() {
    return this.id
  }

}

module.exports = BlockType
