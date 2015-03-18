/* @flow */
var Dragon    = require('react-dragon')
var MoveBlock = require('actions/block/move')
var React     = require('react')

var Orderable = React.createClass({

  propTypes: {
    block  : React.PropTypes.any.isRequired,
    onDrop : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      onDrop: MoveBlock
    }
  },

  render(): any {
    var { block, children } = this.props

    return (
      <Dragon className="col-block" message={ block.id } onDrop={ this._onDrop }>
        { children }
      </Dragon>
    )
  },

  _onDrop(fromId: number) {
    this.props.onDrop(fromId, this.props.block.id)
  }

})

module.exports = Orderable
