/* @flow */
var Dragon = require('react-dragon')
var React  = require('react')

var Orderable = React.createClass({

  propTypes: {
    block  : React.PropTypes.any.isRequired,
    onMove : React.PropTypes.func.isRequired
  },

  render(): any {
    return (
      <Dragon className="col-block" message={ this.props.block.id } onDrop={ this._onDrop }>
        { this.props.children }
      </Dragon>
    )
  },

  _onDrop(fromId: number) {
    this.props.onMove(fromId, this.props.block.id)
  }

})

module.exports = Orderable
