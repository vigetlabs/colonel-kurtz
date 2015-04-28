import Actions       from 'actions/blocks'
import React         from 'react'
import SwitchNav     from './SwitchNav'
import SwitchToggle  from './SwitchToggle'
import classNames    from 'classnames'
import typesForBlock from 'utils/typesForBlock'

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

  getClassName() {
    return classNames('col-switch', {
      'col-switch-open' : this.state.open || this.props.forceOpen
    })
  },

  render() {
    let { app, forceOpen, parent, position } = this.props

    let open  = forceOpen || this.state.open
    let types = typesForBlock(app.get('blockTypes'), parent)

    return types.length ? (
      <div className={ this.getClassName() }>
        <SwitchToggle onClick={ this._onToggle } secondary={ parent } hide={ open } />
        <SwitchNav app={ app } blockTypes={ types } parent={ parent } hide={ !open } position={ position }/>
      </div>
    ) : null
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
