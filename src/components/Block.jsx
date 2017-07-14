let React             = require('react')
let Actions           = require('../actions/blocks')
let Animator          = require('./Animator')
let BlockMenu         = require('./BlockMenu')
let FallbackBlockType = require('../models/FallbackBlockType')
let Switch            = require('./Switch')
let respondsTo        = require('../utils/respondsTo')

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

    let blockType = app.state.blockTypes.filter(i => i.id === block.type)[0]

    return blockType ? blockType : new FallbackBlockType({ block })
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
    this.setMenuItems(this.block)

    // Trigger an initial change to ensure default content
    // is assigned immediately
    this._onChange(this.getContent(this.props.block))
  },

  getContent(block) {
    let { component } = this.getBlockType()
    let defaults = typeof component.getDefaultProps === 'function' ? component.getDefaultProps() : {}

    return { ...defaults.content, ...block.content }
  },

  render() {
    let { app, block, children } = this.props
    let { component:Component } = this.getBlockType()
    let { menuOpen, extraMenuItems } = this.state

    // Determine content by taking the default content and extend it with
    // the current block content
    let content = this.getContent(block)

    return (
      <div className="col-editor-block">
        <div className={ `col-block col-block-${ block.type }` }>
          <Component ref={ (el) => this.block = el } { ...block } content={ content } onChange={ this._onChange } >
            <Switch app={ app } parent={ block } />
            <Animator className="col-block-children">
              { children }
            </Animator>
          </Component>

          <BlockMenu ref={ (el) => this.menu = el } app={ app } block={ block } items={ extraMenuItems } active={ menuOpen } onOpen={ this.openMenu } onExit={ this.closeMenu } />
        </div>

        <Switch app={ app } position={ block } parent={ block.parent } />
      </div>
    )
  },

  _onChange(content) {
    let { app, block } = this.props
    app.push(Actions.update, [block, content])
  }
})
