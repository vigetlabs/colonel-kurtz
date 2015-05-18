let Actions    = require('../actions/blocks')
let Animator   = require('./Animator')
let Menu       = require('./Menu')
let React      = require('react')
let Switch     = require('./Switch')
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

  getMenuItems() {
    return this.state.extraMenuItems
  },

  setMenuItems(component) {
    if (respondsTo(component, 'getMenuItems')) {
      this.setState({ extraMenuItems: component.getMenuItems() })
    }
  },

  openMenu() {
    this.setState({ menuOpen: true })
  },

  closeMenu() {
    this.setState({ menuOpen: false })
  },

  componentDidMount() {
    this.setMenuItems(this.refs.block)
  },

  render() {
    let { app, block, children } = this.props
    let { component:Component } = this.getBlockType()
    let { menuOpen, extraMenuItems } = this.state

    return (
      <div className="col-editor-block">
        <div className={ `col-block col-block-${ block.type }`}>
          <Component ref="block" { ...block } onChange={ app.prepare(Actions.update, block) } >
            <Switch app={ app } parent={ block } />
            <Animator>{ children }</Animator>
          </Component>

          <Menu app={ app } block={ block } items={ extraMenuItems } active={ menuOpen } onOpen={ this.openMenu } onExit={ this.closeMenu } />
        </div>

        <Switch app={ app } position={ block } parent={ block.parent } />
      </div>
    )
  }
})
