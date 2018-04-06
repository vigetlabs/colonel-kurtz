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
    Object.assign(this, defaults, config)
  }

  valueOf() {
    return this.id
  }
}
