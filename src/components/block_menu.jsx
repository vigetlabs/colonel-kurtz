import Actions      from 'actions/blocks'
import Btn          from './ui/button'
import React        from 'react'
import classNames   from 'classnames'
import {Downstream} from 'microcosm'

export default React.createClass({
  mixins: [ Downstream ],

  propTypes: {
    blockTypes : React.PropTypes.array.isRequired
  },

  getInitialState() {
    return { open: false }
  },

  componentWillReceiveProps() {
    this.setState({ open: false })
  },

  getToggle() {
    return (<Btn ref="toggle" className="col-menu-toggle" onClick={ this._onToggle }>+</Btn>)
  },

  getButton({ id, label }) {
    let onAdd = () => this._onAdd(id)
    return (<Btn key={ id } className="col-menu-btn" onClick={ onAdd }>{ label }</Btn>)
  },

  render() {
    let { blockTypes, forceOpen } = this.props

    let open      = forceOpen || this.state.open
    let allowed   = blockTypes.filter(i => !i.private)
    let className = classNames('col-menu', { 'col-menu-open': open })

    return (
      <nav className={ className } role="navigation">
        { open ? null : this.getToggle() }
        { open ? allowed.map(this.getButton) : null }
      </nav>
    )
  },

  _onToggle() {
    this.setState({ open: true })
  },

  _onAdd(id) {
    let { position, parent } = this.props
    this.send(Actions.create, id, position, this.props.parent)
  }

})
