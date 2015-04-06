import Actions      from 'actions/blocks'
import React        from 'react'
import SwitchToggle from './SwitchToggle'
import SwitchNav    from './SwitchNav'
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

    let blockTypes = app.pull('blockTypes')

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
    let { app, position, parent } = this.props

    let blockTypes = app.pull('blockTypes')

    if (blockTypes.length === 1) {
      app.push(Actions.create, blockTypes[0].id, position, parent)
    }

    this.setState({ open: true })
  }

})
