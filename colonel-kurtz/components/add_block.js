/* @flow */

var React        = require('react')
var BlockType    = require('../stores/block_type_store')
var Button       = require('./ui/button')
var BlockActions = require('../actions/block_actions')
var Strings      = require('../constants/strings')
var Monitor      = require('../mixins/monitor')

var AddBlock = React.createClass({

  mixins: [ Monitor ],

  propTypes: {
    label: React.PropTypes.string.isRequired
  },

  getState() {
    return BlockType.find(this.props.type)
  },

  render(): any {
    var { icon, id, label } = this.state

    return (
      <Button key={ id } aria-label={ label } className="colonel-btn-icon" onClick={ this._onClick }>
        <img src={ icon } alt={ id } aria-hidden="true" />
      </Button>
    )
  },

  _onClick(e) {
    var { blockListId: parentBlockListId, type, position } = this.props

    BlockActions.create({ parentBlockListId, position, type })

    e.preventDefault()
  }

})

module.exports = AddBlock
