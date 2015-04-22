import React from 'react'

export default class BlockType {

  constructor({ component, label, types, id }) {
    if (typeof component === 'object') {
      component = React.createClass(component)
    }

    this.id        = id
    this.label     = label
    this.types     = types || []
    this.component = component
  }

  valueOf() {
    return this.id
  }

}
