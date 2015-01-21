var BlockStore = require('stores/block_store')
var Monitor    = require('mixins/monitor')
var React      = require('react')

module.exports = {
  mixins: [ Monitor ],

  propTypes: {
    block: React.PropTypes.any.isRequired
  },

  getState() {
    return {
      blocks: BlockStore.childrenFor(this.props.block)
    }
  }

}
