let Animator  = require('./Animator')
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
      items: []
    }
  },

  getMenuItem(item) {
    let { id } = item
    return (<Item key={ id } ref={ id } { ...item} { ...this.props} />)
  },

  getMenuItems() {
    return this.props.items.concat(menuItems).map(this.getMenuItem)
  },

  getMenu() {
    if (!this.props.active) return null;

    return React.createElement(FocusTrap, {
      active    : true,
      key       : 'menu',
      className : 'col-menu',
      element   : 'nav',
      onExit    : this.props.onExit,
      role      : 'navigation'
    }, this.getMenuItems())
  },

  render() {
    return (
      <Animator className="col-menu-wrapper" transitionName="col-menu" transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 200 }>
        <Handle key="handle" ref="handle" onClick={ this.props.onOpen }/>
        { this.getMenu() }
      </Animator>
    )
  }

})
