import FocusTrap from 'react-focus-trap'
import Handle    from './MenuHandle'
import Item      from './MenuItem'
import React     from 'react'
import menuItems from '../config/menu'

export default React.createClass({

  statics: { Item },

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      items: []
    }
  },

  getInitialState() {
    return { open : false }
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

  render() {
    return (
      <div className="col-menu-wrapper">
        <Handle ref="handle" onClick={ this._onHandleClick }/>
        <FocusTrap element="nav" role="navigation" className="col-menu" onExit={ this._onExit } active={ this.state.open }>
          { this.getMenuItems() }
        </FocusTrap>
      </div>
    )
  },

  _onExit() {
    this.setState({ open: false })
  },

  _onHandleClick(e) {
    e.preventDefault()
    this.setState({ open : !this.state.open })
  }

})
