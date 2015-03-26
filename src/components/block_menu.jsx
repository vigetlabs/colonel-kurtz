import Actions       from 'actions/blocks'
import BlockTypes    from 'stores/block_type_store'
import Button        from './ui/button'
import React         from 'react'
import classNames    from 'classnames'

let BlockMenu = React.createClass({

  getInitialState() {
    return { open: false }
  },

  componentWillReceiveProps() {
    this.setState({ open: false })
  },

  getToggle() {
    return (<Button className="col-menu-toggle" onClick={ this._onToggle }>+</Button>)
  },

  getButton({ id, label }) {
    let { parent, position, flux } = this.props

    let onAdd = () => flux.send(Actions.create, id, position, parent)

    return (
      <Button key={ id } className="col-menu-btn" onClick={ onAdd }>
        { label }
      </Button>
    )
  },

  render() {
    let open       = this.props.forceOpen || this.state.open
    let blockTypes = this.props.flux.get(BlockTypes).filter(i => !i.private)
    let className  = classNames('col-menu', { 'col-menu-open': open })

    return (
      <nav className={ className } role="navigation">
        { open ? null : this.getToggle() }
        { open ? blockTypes.map(this.getButton) : null }
      </nav>
    )
  },

  _onToggle() {
    this.setState({ open: true })
  }

})

export default BlockMenu
