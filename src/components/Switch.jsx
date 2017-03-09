let ActionButton  = require('./ActionButton')
let Actions       = require('../actions/blocks')
let Blocks        = require('../stores/Blocks')
let React         = require('react')
let SwitchNav     = require('./SwitchNav')
let classNames    = require('classnames')
let typesForBlock = require('../utils/typesForBlock')

module.exports = React.createClass({

  propTypes: {
    app : React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { open: false }
  },

  componentWillReceiveProps() {
    this.setState({ open: false })
  },

  open() {
    this.setState({ open: true })
  },

  close() {
    this.setState({ open: false }, () => {
      this.refs.toggle.focus()
    })
  },

  getToggle() {
    if (this.state.open) return null

    return (<ActionButton ref="toggle"
                          disabled={ this.hasMaxChildren() }
                          label="Open the block menu and create a block"
                          onClick={ this._onToggle } />)
  },

  getNav(blockTypes) {
    if (!this.state.open) return null

    return (<SwitchNav ref="nav"
                       blockTypes={ blockTypes }
                       onAdd={ this._onAdd }
                       onExit={ this.close } />)
  },

  hasMaxChildren() {
    let { app, parent } = this.props

    if (!parent) {
      return Blocks.filterChildren(app.state.blocks).length >= app.state.maxChildren
    }

    let children = Blocks.getChildren(app.state.blocks, parent)
    let type     = app.state.blockTypes.filter(t => t.id === parent.type)[0]

    return children.length >= type.maxChildren
  },

  hasHitMaxDepth() {
    let { app, parent } = this.props
    if (!app.state.maxDepth) return false

    return Blocks.getDepth(app.state.blocks, parent, app.state.maxDepth) >= app.state.maxDepth
  },

  render() {
    let { app, parent, position } = this.props
    let types = typesForBlock(app.state.blockTypes, parent)

    let className = classNames('col-switch', {
      'col-switch-disabled': (this.hasMaxChildren() || this.hasHitMaxDepth())
    })

    return types.length ? (
      <div className={ className } onKeyUp={ this._onKeyUp }>
        { this.getToggle() }
        { this.getNav(types) }
      </div>
    ) : null
  },

  _onAdd(type) {
    let { app, position, parent } = this.props
    app.push(Actions.create, [type.id, position, parent])
  },

  _onToggle() {
    let { app, position, parent } = this.props

    let types = typesForBlock(app.state.blockTypes, parent)
    // If only one type exists, instead of opening the nav, just
    // create that element
    if (types.length === 1) {
      app.push(Actions.create, [types[0].id, position, parent])
    }

    this.open()
  },

  _onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }

})
