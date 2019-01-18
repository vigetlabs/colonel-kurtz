import ActionButton from './ActionButton'
import Actions from '../actions/blocks'
import Blocks from '../stores/Blocks'
import React from 'react'
import SwitchNav from './SwitchNav'
import classNames from 'classnames'
import typesForBlock from '../utils/typesForBlock'
import BlockContext from '../contexts/blocks'

export default class Switch extends React.Component {
  static contextType = BlockContext

  state = {
    open: false
  }

  open() {
    this.setState({ open: true })
  }

  close() {
    this.setState({ open: false }, () => {
      this.toggle.focus()
    })
  }

  getToggle() {
    if (this.state.open) return null

    return (
      <ActionButton
        ref={el => (this.toggle = el)}
        label="Open the block menu and create a block"
        onClick={this._onToggle.bind(this)}
      />
    )
  }

  getNav(blockTypes) {
    if (!this.state.open) {
      return null
    }

    return (
      <SwitchNav
        ref={el => (this.nav = el)}
        structure={this.props.structure}
        onAdd={this._onAdd.bind(this)}
        onExit={this.close.bind(this)}
      />
    )
  }

  hasMaxChildren() {
    let { app, parent } = this.props

    if (!parent) {
      return (
        Blocks.filterChildren(app.state.blocks).length >= app.state.maxChildren
      )
    }

    let children = Blocks.getChildren(app.state.blocks, parent)
    let type = app.state.blockTypes.filter(t => t.id === parent.type)[0]

    return children.length >= type.maxChildren
  }

  depth() {
    let { app, parent } = this.props
    return Blocks.getDepth(app.state.blocks, parent, app.state.maxDepth) + 1
  }

  hasHitMaxDepth() {
    let { app } = this.props
    if (!app.state.maxDepth) return false

    return this.depth() >= app.state.maxDepth
  }

  render() {
    let { structure } = this.props

    return structure.length ? (
      <div className="col-switch" onKeyUp={this._onKeyUp.bind(this)}>
        {this.getToggle()}
        {this.getNav(structure)}
      </div>
    ) : null
  }

  _onAdd(type) {
    this.context.add(type)

    this.setState({ open: false })
  }

  _onToggle() {
    let { structure } = this.props

    // If only one type exists, instead of opening the nav, just
    // create that element
    if (structure.length === 1) {
      this._onAdd(structure[0], this.props.parent)
    } else {
      this.open()
    }
  }

  _onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }
}
