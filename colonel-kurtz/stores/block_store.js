/* @flow */

var merge = require('react/lib/merge')
var Events = require('events')
var Dispatcher = require('../dispatcher')
var Constants = require('../constants/block_constants')
var BlockListConstants = require('../constants/block_list_constants')
var Actions = require('../actions/block_actions')
var BlockListActions = require('../actions/block_list_actions')
var _ = require('underscore')

var _blocks = []

var BlockStore = merge(Events.EventEmitter.prototype, {

  all(): Array<Block> {
    return _blocks
  },

  find(id: number): Block {
    return _.find(this.all(), function(block) {
      return block.id === id
    })
  },

  _create(parentBlockListId: number): Block {
    var block = new Block({ parentBlockListId: parentBlockListId })
    _blocks.push(block)
    this.emit(Constants.BLOCK_CREATED)
    return block
  },

  _destroy(blockId: number) {
    var block = this.find(blockId)

    if (block) {
      var removalIndex = _blocks.indexOf(block)
      _blocks.splice(removalIndex, 1)
      this.emit(Constants.BLOCK_DESTROYED)
    }
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {
      case Constants.BLOCK_CREATE:
        var block = BlockStore._create(action.parentBlockListId)
        action.block = block
        break
      case Constants.BLOCK_DESTROY:
        BlockStore._destroy(action.blockId)
        break
      case Constants.BLOCK_UPDATE:
        // do a thing
        break
      default:
        // do nothing
    }
  })

})

module.exports = BlockStore

var Block = require('../models/block')
