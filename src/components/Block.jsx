let Actions    = require('../actions/blocks')
let Menu       = require('./Menu')
let React      = require('react')
let respondsTo = require('../utils/respondsTo')

module.exports = React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      extraMenuItems : [],
      menuOpen       : false
    }
  },

  getBlockType() {
    let { app, block } = this.props
    return app.refine('blockTypes').find(i => i.id === block.type)
  },

  setMenuItems(component) {
    if (respondsTo(component, 'getMenuItems')) {
      this.setState({ extraMenuItems: component.getMenuItems() })
    }
  },

  render() {
    let { app, block, children } = this.props
    let { extraMenuItems } = this.state
    let { component:Component } = this.getBlockType()

    return (
      <div className={ `col-block col-block-${ block.type }`}>
        <Component ref={ this.setMenuItems } { ...block } onChange={ this._onChange } >
          { children }
        </Component>

        <Menu ref="menu"
              { ...this.props }
              items={ extraMenuItems }
              active={ this.state.menuOpen }
              onOpen={ this._onMenuOpen }
              onExit={ this._onMenuExit } />
      </div>
    )
  },

  _onMenuOpen() {
    this.setState({ menuOpen: true })
  },

  _onMenuExit() {
    this.setState({ menuOpen: false })
  },

  _onChange(content) {
    let { app, block } = this.props
    app.push(Actions.update, block, content)
  }

})
