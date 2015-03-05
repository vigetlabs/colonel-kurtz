var BlockStore = require('stores/block_store')
var React      = require('react')
var Stateful   = require('diode/stateful')

module.exports = {
  mixins: [ Stateful ],

  propTypes: {
    block: React.PropTypes.any.isRequired
  },

  getState() {
    return {
      blocks: BlockStore.childrenFor(this.props.block)
    }
  }
}
