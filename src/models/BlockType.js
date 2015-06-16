let React = require('react')

let defaults = {
  maxChildren : Infinity,
  root        : true,
  types       : []
}

class BlockType {

  constructor(config) {
    let { component } = Object.assign(this, defaults, config)

    if (typeof component === 'object') {
      this.component = React.createClass(component)
    }
  }

  valueOf() {
    return this.id
  }

}

module.exports = BlockType
