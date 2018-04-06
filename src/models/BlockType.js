import React from 'react'
import DefaultBlockType from '../components/DefaultBlockType'

let defaults = {
  component: DefaultBlockType,
  group: null,
  maxChildren: Infinity,
  root: true,
  types: []
}

export default class BlockType {
  constructor(config) {
    let { component } = Object.assign(this, defaults, config)

    if (typeof component === 'object') {
      console.log("HI", component)
      this.component = function Component() {
        React.Component.apply(this, arguments)
      }
      this.component.prototype = Object.create(React.Component.prototype)
      Object.assign(this.component.prototype, component)
    }
  }

  valueOf() {
    return this.id
  }
}
