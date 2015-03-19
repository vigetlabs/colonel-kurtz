import Dragon from 'react-dragon'
import React  from 'react'

var Orderable = React.createClass({

  propTypes: {
    block  : React.PropTypes.any.isRequired,
    onMove : React.PropTypes.func.isRequired
  },

  render() {
    return (
      <Dragon className="col-block" message={ this.props.block.id } onDrop={ this._onDrop }>
        { this.props.children }
      </Dragon>
    )
  },

  _onDrop(fromId) {
    this.props.onMove(fromId, this.props.block.id)
  }

})

export default Orderable
