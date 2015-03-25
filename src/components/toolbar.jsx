import Button   from './ui/button'
import React    from 'react'
import menuIcon from 'icons/menu'

let Toolbar = React.createClass({

  propTypes: {
    block     : React.PropTypes.object.isRequired,
    onDestroy : React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="col-toolbar">
        <span className="col-toolbar-handle" dangerouslySetInnerHTML={{ __html: menuIcon }} />

        <nav role="navigation" className="col-toolbar-menu">
          <Button className="col-toolbar-menu-item" onClick={ this._onDestroy }>Remove</Button>
          <Button className="col-toolbar-menu-item" onClick={ this._onDestroy }>Move Up</Button>
          <Button className="col-toolbar-menu-item" onClick={ this._onDestroy }>Move Down</Button>
        </nav>
      </div>
    )
  },

  _onDestroy(e) {
    e.preventDefault()
    this.props.onDestroy(this.props.block.id)
  }

})

export default Toolbar
