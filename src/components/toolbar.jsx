import Button   from './ui/button'
import React    from 'react'
import menuIcon from 'icons/menu'

let Toolbar = React.createClass({

  propTypes: {
    block     : React.PropTypes.object.isRequired,
    onDestroy : React.PropTypes.func.isRequired,
    onMove    : React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="col-toolbar">
        <span className="col-toolbar-handle" dangerouslySetInnerHTML={{ __html: menuIcon }} />

        <nav role="navigation" className="col-toolbar-menu">
          <Button ref="moveUp" className="col-toolbar-menu-item" onClick={ this._onMoveUp }>Move Up</Button>
          <Button ref="moveDown" className="col-toolbar-menu-item" onClick={ this._onMoveDown }>Move Down</Button>
          <Button ref="destroy" className="col-toolbar-menu-item" onClick={ this._onDestroy }>Remove</Button>
        </nav>
      </div>
    )
  },

  _onDestroy(e) {
    e.preventDefault()
    this.props.onDestroy(this.props.block.id)
  },

  _onMoveUp(e) {
    e.preventDefault()
    this.props.onMove(-1)
  },

  _onMoveDown(e) {
    e.preventDefault()
    this.props.onMove(1)
  }

})

export default Toolbar
