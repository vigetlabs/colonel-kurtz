import Actions      from 'actions/blocks'
import React        from 'react'
import SwitchNav    from './SwitchNav'
import SwitchToggle from './SwitchToggle'
import classNames   from 'classnames'

export default React.createClass({
  propTypes: {
    app : React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { open: false }
  },

  componentWillReceiveProps() {
    this.setState({ open: false })
  },

  getTypes() {
    let { app, parent } = this.props

    let blockTypes = app.get('blockTypes')

    if (parent) {
      let types = blockTypes.filter(i => i.id === parent.type)[0].types
      return blockTypes.filter(i => types.indexOf(i.id) > -1)
    } else {
      return blockTypes
    }
  },

  render() {
    let { app, forceOpen, parent, position } = this.props

    let types = this.getTypes()
    let open  = forceOpen || this.state.open

    return types.length ? (
      <div className={ classNames('col-switch', { 'col-switch-open' : open }) }>
        <SwitchToggle onClick={ this._onToggle } secondary={ parent } hide={ open } />
        <SwitchNav app={ app } blockTypes={ types } parent={ parent } hide={ !open } position={ position }/>
      </div>
    ) : null
  },

  _onToggle() {
    let types = this.getTypes()

    // If only one type exists, instead of opening the nav, just
    // create that element
    if (types.length === 1) {
      let { app, position, parent } = this.props
      app.push(Actions.create, types[0].id, position, parent)
    }

    this.setState({ open: true })
  }
})
