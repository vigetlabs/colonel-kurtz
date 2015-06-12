let React = require('react')

class BlockType {

  constructor({ component, menuItems, label, types, id, root = true }) {
    if (typeof component === 'object') {
      component = React.createClass(component)
    }

    this.id        = id
    this.label     = label
    this.types     = types || []
    this.component = component
    this.menuItems = menuItems
    this.root      = root
  }

  valueOf() {
    return this.id
  }

}

module.exports = BlockType
