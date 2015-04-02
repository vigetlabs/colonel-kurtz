import Actions      from 'actions/blocks'
import Btn          from './ui/Button'
import React        from 'react'
import classNames   from 'classnames'
import notPrivate   from 'utils/notPrivate'

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

  getToggle() {
    return (<Btn ref="toggle" className="col-switch-toggle" onClick={ this._onToggle }>+</Btn>)
  },

  getButton({ id, label }) {
    let onAdd = () => this._onAdd(id)
    return (<Btn key={ id } className="col-switch-btn" onClick={ onAdd }>{ label }</Btn>)
  },

  render() {
    let { app, forceOpen } = this.props

    let blockTypes = app.pull('blockTypes', notPrivate)
    let open       = forceOpen || this.state.open
    let className  = classNames('col-switch', { 'col-switch-open': open })

    return (
      <nav className={ className } role="navigation">
        { open ? null : this.getToggle() }
        { open ? blockTypes.map(this.getButton) : null }
      </nav>
    )
  },

  _onToggle() {
    this.setState({ open: true })
  },

  _onAdd(id) {
    let { app, position, parent } = this.props
    app.push(Actions.create, id, position, this.props.parent)
  }

})
