var Block     = require('../models/block')
var invariant = require('react/lib/invariant')

import { Store } from 'microcosm'

class BlockStore extends Store {

  getInitialState(seed) {
    this.state = []

    this.deserialize(seed)

    return this.state
  }

  register({ blocks }) {
    return {
      [blocks.create]  : this._create,
      [blocks.destroy] : this._destroy,
      [blocks.update]  : this._update,
      [blocks.move]    : this._move
    }
  }

  childrenFor(block) {
    return this.state.filter((b) => b.parent === block)
  }

  root() {
    return this.state.filter(b => !b.parent)[0]
  }

  all() {
    return this.state
  }

  find(id) {
    var block = this.state.filter((b) => b.id === id)[0]

    invariant(block, `Unable to find block with id of ${ id }`)

    return block
  }

  _create({ content = null, parent, position = this.state.length, type }) {
    var block = new Block({ content, parent, type })

    if (position instanceof Block) {
      position = this._indexOf(position) + 1
    }

    this.state.splice(position, 0, block)

    return block
  }

  _destroy(id) {
    let ref = id.valueOf()

    this.state = this.state.filter(function(node) {
      for (var n = node; n; n = n.parent) {
        if (n.id == ref) return false
      }

      return true
    })
  }

  _update(id, content) {
    var block = this.find(id)

    block.content = { ...block.content, ...content }

    Diode.publish()
  }

  _reset() {
    this.state = []
  }

  _indexOf(ref) {
    return this.state.indexOf(this.find(ref.valueOf()))
  }

  _move({ fromId, toId }) {
    var from = this._indexOf(fromId)
    var to   = this._indexOf(toId)

    this.state.splice(to, 0, this.state.splice(from, 1)[0]);
  }

  deserialize(items=[], parent = this._create({})): void {
    for (var i = 0, len = items.length; i < len; i++) {
      let { blocks, content, type } = items[i]
      this.deserialize(blocks, this._create({ content, parent, type }))
    }

    return parent
  }

  serialize() {
    let children = this.childrenFor(this.root())

    return children.map(function jsonify (block) {
      return {
        content : block.content,
        type    : block.type,
        blocks  : this.childrenFor(block).map(jsonify, this)
      }
    }, this)
  }
}

export default BlockStore
