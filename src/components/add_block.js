/* @flow */

var BlockType   = require('../stores/block_type_store')
var Button      = require('./ui/button')
var CreateBlock = require('../actions/block/create')
var React       = require('react')
var Types       = React.PropTypes

var AddBlock = React.createClass({

  propTypes: {
    parentBlockListId : Types.number.isRequired,
    position          : Types.number,
    type              : Types.string.isRequired
  },

  getInitialState() {
    return BlockType.find(this.props.type)
  },

  render(): any {
    var { icon, id, label } = this.state

    return (
      <Button aria-label={ label } className="col-btn-icon" onClick={ this._onClick }>
        <img src={ icon } alt={ id } aria-hidden="true" />
      </Button>
    )
  },

  _onClick(e) {
    var { parentBlockListId, type, position } = this.props

    CreateBlock({ parentBlockListId, position, type })

    e.preventDefault()
  }

})

module.exports = AddBlock
