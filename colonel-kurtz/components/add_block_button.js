/* @flow */

var React = require('react')
var Button = require('./ui/button')
var BlockActions = require('../actions/block_actions')
var BlockType = require('../stores/block_type_store')
var Strings = require('constants/strings')
var Monitor = require('../mixins/monitor')

var AddBlockButton = React.createClass({

  mixins: [ Monitor ],

  getState() {
    return {
      types: BlockType.keys()
    }
  },

  addBlock(blockType) {
    var { position, blockListId: parentBlockListId } = this.props
    return () => BlockActions.create({ parentBlockListId, position, blockType })
  },

  getButton(type) {
    return (
      <Button key={ type } aria-label={ Strings.add.label } className="colonel-btn colonel-btn-icon" onClick={ this.addBlock(type) }>
        { type[0] }
      </Button>
    )
  },

  render(): any {
    return (
      <div>
        { this.state.types.map(this.getButton) }
      </div>
    )
  }

})

module.exports = AddBlockButton
