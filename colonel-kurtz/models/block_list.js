/* @flow */

var _ = require('underscore')
var uid = require('../utils/uid')

var BlockList = function(params: {editorId: number; blockId: number}) {
  var id: number = uid()

  this.editorId = params.editorId
  this.blockId = params.blockId
  this.id = id
  this._blockPositions = []
}

BlockList.prototype = {

  toJSON() {
    return {
      id: this.id,
      blocks: this._blockPositions.map(function(blockPosition) {
        var block = BlockStore.find(blockPosition.blockId)
        return block.toJSON()
      })
    }
  },

  blockIds() {
    return this._blockPositions.map(function(blockPosition) {
      return blockPosition.blockId
    })
  },

  removeBlock(blockId) {
    this._blockPositions = _.reject(this._blockPositions, function(blockPosition) {
      return blockId === blockPosition.blockId
    })

    this._cleanup()
  },

  insertBlock(block, position) {
    if (!position) {
      var position = 0
    }

    this._incrementBlockPositionsAfter(position);


    this._blockPositions.push({
      blockId: block.id,
      position: position
    })

    this._cleanup()
  },

  _incrementBlockPositionsAfter(position) {
    this._blockPositions.forEach(function(blockPosition){
      if (blockPosition.position >= position) {
        blockPosition.position += 1
      }
    })
  },

  _cleanup() {
    this._sortBlockPositions()
    this._ensureConsecutivePositions()
  },

  _ensureConsecutivePositions() {
    var counter = 0

    this._blockPositions = this._blockPositions.map(function(blockPosition) {
      blockPosition.position = counter
      counter +=1
      return blockPosition
    })
  },

  _sortBlockPositions() {
    this._blockPositions = _.sortBy(this._blockPositions, function(blockPosition){
      return blockPosition.position
    })
  }

}

module.exports = BlockList

var BlockStore = require('../stores/block_store')
