let ActionButton  = require('./ActionButton')
let Actions       = require('../actions/blocks')
let Blocks        = require('../stores/Blocks')
let React         = require('react')
let SwitchNav     = require('./SwitchNav')
let classNames    = require('classnames')
let typesForBlock = require('../utils/typesForBlock')

module.exports = React.createClass({

  propTypes: {
    app : React.PropTypes.object.isRequired,
    insertAllowed : React.PropTypes.bool.isRequired
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
                          disabled={ !this.props.insertAllowed }
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

  render() {
    let { app, containingBlock, preceedingBlock } = this.props
    let types = typesForBlock(app.get('blockTypes'), containingBlock)

    let className = classNames('col-switch', {
      'col-switch-disabled': !this.props.insertAllowed
    })

    return types.length ? (
      <div className={ className } onKeyUp={ this._onKeyUp }>
        { this.getToggle() }
        { this.getNav(types) }
      </div>
    ) : null
  },

  _onAdd(type) {
    let { app, preceedingBlock, containingBlock } = this.props
    app.push(Actions.create, type.id, preceedingBlock, containingBlock)
  },

  _onToggle() {
    let { app, preceedingBlock, containingBlock } = this.props

    let types = typesForBlock(app.get('blockTypes'), containingBlock)
    // If only one type exists, instead of opening the nav, just
    // create that element
    if (types.length === 1) {
      app.push(Actions.create, types[0].id, preceedingBlock, containingBlock)
    }

    this.open()
  },

  _onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }

})
