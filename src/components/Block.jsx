let React            = require('react')
let Actions          = require('../actions/blocks')
let Animator         = require('./Animator')
let BlockMenu        = require('./BlockMenu')
let InsertionPoint   = require('./InsertionPoint')
let respondsTo       = require('../utils/respondsTo')
let dragAndDropUtils = require('../utils/dragAndDrop')
let DragSource       = require('react-dnd').DragSource

var Block = React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    connectDragSource: React.PropTypes.func.isRequired
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

    const { isDragging, connectDragSource, text } = this.props

    return connectDragSource(
      <div className="col-editor-block" style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className={ `col-block col-block-${ block.type }` }>
          <Component ref="block" { ...block } onChange={ this._onChange } >
            <InsertionPoint app={ app } parent={ block } preceedingBlock={ null } containingBlock={ block } />
            <Animator className="col-block-children">
              { children }
            </Animator>
          </Component>
          <BlockMenu ref="menu" app={ app } block={ block } items={ extraMenuItems } active={ menuOpen } onOpen={ this.openMenu } onExit={ this.closeMenu } />
        </div>

        <InsertionPoint app={ app } preceedingBlock={ block } containingBlock={ block.parent } />
      </div>
    )
  },

  _onChange(content) {
    let { app, block } = this.props
    app.push(Actions.update, block, content)
  }
})

module.exports = DragSource('block', dragAndDropUtils.dragHandlers, dragAndDropUtils.dragCollect)(Block)
