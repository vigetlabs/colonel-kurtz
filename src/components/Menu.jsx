let FocusTrap = require('react-focus-trap')
let Handle    = require('./MenuHandle')
let Item      = require('./MenuItem')
let React     = require('react')
let menuItems = require('../config/menu')

module.exports = React.createClass({

  statics: { Item },

  propTypes: {
    app    : React.PropTypes.object.isRequired,
    block  : React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      items : [],
    }
  },

  getMenuItem(item) {
    let { id } = item

    return (<Item key={ id }
                  ref={ id }
                  { ...item}
                  { ...this.props}
                  onBeforeClick={ this.props.onSelect } />)
  },

  getMenuItems() {
    return this.props.items.concat(menuItems).map(this.getMenuItem)
  },

  getMenu() {
    return React.createElement(FocusTrap, {
      active    : this.props.active,
      className : 'col-menu',
      element   : 'nav',
      onExit    : this.props.onExit,
      role      : 'navigation'
    }, this.getMenuItems())
  },

  render() {
    return (
      <div className="col-menu-wrapper">
        <Handle ref="handle" onClick={ this.props.onOpen }/>
        { this.getMenu() }
      </div>
    )
  }

})
