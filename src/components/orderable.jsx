/* @flow */
var Dragon = require('react-dragon')
var React  = require('react')

var Orderable = React.createClass({

  contextTypes: {
    actions : React.PropTypes.object.isRequired
  },

  propTypes: {
    block : React.PropTypes.any.isRequired
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
    this.context.actions.blocks.move(fromId, this.props.block.id)
  }

})

module.exports = Orderable
