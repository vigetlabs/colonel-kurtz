let Actions       = require('../actions/blocks')
let React         = require('react')
let SwitchNav     = require('./SwitchNav')
let SwitchToggle  = require('./SwitchToggle')
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

    return (<SwitchToggle ref="toggle"
                          onClick={ this._onToggle }
                          secondary={ this.props.parent } />)
  },

  getNav(open, blockTypes) {
    if (!open) return null

    let { app, parent, position } = this.props

    return (<SwitchNav ref="nav"
                       app={ app }
                       blockTypes={ blockTypes }
                       onExit={ this._onNavExit }
                       parent={ parent }
                       position={ position } />)
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

  _onNavExit() {
    this.setState({ open: false }, () => {
      this.refs.toggle.focus()
    })
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
