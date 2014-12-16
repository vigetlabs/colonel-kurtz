/**
 * Draggable
 * A draggability component helper
 */

var React = require('react/addons')
var Types = React.PropTypes;
var cx    = React.addons.classSet

var Draggable = React.createClass({

  propTypes: {
    transmit : Types.any.isRequired,
    onDrop   : Types.func.isRequired
  },

  getDefaultProps() {
    return {
      dropEffect: 'copy'
    }
  },

  getInitialState() {
    return {
      dragging  : false,
      droppable : false
    }
  },

  render() {
    var className = cx(this.props.className, cx({
      'col-draggable' : true,
      'col-dragging'  : this.state.dragging,
      'col-droppable' : this.state.droppable
    }))

    return (
      <div className={ className }
           onDragStart={ this._onDragStart }
           onDragOver={ this._onDragOver }
           onDragLeave={ this._onDragLeave }
           onDragEnd={ this._onDragEnd }
           onDrop={ this._onDrop }
           draggable>
        <div className="col-draggable-children">{ this.props.children }</div>
      </div>
    )
  },

  _onDragStart(e) {
    var { transmit, dropEffect } = this.props

    e.dataTransfer.setData('text/plain', JSON.stringify(transmit))
    e.dataTransfer.dropEffect = dropEffect

    this.setState({ dragging: true })
  },

  _onDragEnd(e) {
    this.setState({ droppable: false, dragging: false })
  },

  _onDragOver(e) {
    this.setState({ droppable: true })
  },

  _onDragLeave(e) {
    this.setState({ droppable: false })
  },

  _onDrop(e) {
    e.preventDefault()

    var transmission = JSON.parse(e.dataTransfer.getData('text/plain'))
    var receiver     = this.props.transmit;

    this.props.onDrop(transmission, receiver);

    this.setState({ droppable: false, dragging: false })
  }

})

module.exports = Draggable;
