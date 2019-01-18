import BlockTypeGroup from './BlockTypeGroup'
import Btn from './Button'
import React from 'react'
import DOM from 'react-dom'
import groupBy from 'group-by'

export default class SwitchNav extends React.Component {
  getButton(definition) {
    let { id, title, type } = definition
    let { onAdd } = this.props

    return (
      <Btn key={id} className="col-switch-btn" onClick={onAdd.bind(null, type)}>
        {title}
      </Btn>
    )
  }

  autoFocus(el) {
    if (el) {
      el.focus()
    }
  }

  render() {
    let { structure } = this.props

    return (
      <nav className="col-switch-nav" role="navigation" ref={this.autoFocus()}>
        {structure.map(this.getButton, this)}
      </nav>
    )
  }
}
