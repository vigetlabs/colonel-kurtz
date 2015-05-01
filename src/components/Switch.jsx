let ActionButton  = require('./ActionButton')
let Actions       = require('../actions/blocks')
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

  getClassName() {
    return classNames('col-switch', {
      'col-switch-open' : this.state.open || this.props.forceOpen
    })
  },

  getToggle(open) {
    if (open) return null

    return (<ActionButton ref="toggle"
                          label="Open the block menu and create a block"
                          onClick={ this._onToggle } />)
  },

  getNav(open, blockTypes) {
    if (!open) return null

    return (<SwitchNav ref="nav"
                       blockTypes={ blockTypes }
                       onAdd={ this._onAdd }
                       onExit={ this.close } />)
  },

  close() {
    this.setState({ open: false }, () => {
      this.refs.toggle.focus()
    })
  },

  render() {
    let { app, forceOpen, parent, position } = this.props

    let open  = forceOpen || this.state.open
    let types = typesForBlock(app.get('blockTypes'), parent)

    return types.length ? (
      <div className={ this.getClassName() }>
        { this.getToggle(open, types) }
        { this.getNav(open, types) }
      </div>
    ) : null
  },

  _onAdd(id) {
    let { app, position, parent } = this.props
    app.push(Actions.create, id, position, parent)
  },

  _onToggle() {
    let { app, position, parent } = this.props

    let types = typesForBlock(app.get('blockTypes'), parent)

    // If only one type exists, instead of opening the nav, just
    // create that element
    if (types.length === 1) {
      app.push(Actions.create, types[0].id, position, parent)
    }

    this.setState({ open: true })
  }

})
