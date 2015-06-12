let React = require('react')

let defaults = { root: true }

class BlockType {

  constructor(config) {
    let { component, menuItems, label, types, id, root } = { ...defaults, ...config }

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
