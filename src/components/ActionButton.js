import React from 'react'
import DOM from 'react-dom'
import Btn from './Button'

export default class ActionButton extends React.Component {
  static defaultProps = {
    className: 'col-btn-fab',
    symbol: '+'
  }

  focus() {
    DOM.findDOMNode(this).focus()
  }

  render() {
    let { className, disabled, label, onClick, symbol } = this.props

    return (
      <Btn className={className} onClick={onClick} disabled={disabled}>
        <span className="col-hidden">{label}</span>
        <span aria-hidden="true">{symbol}</span>
      </Btn>
    )
  }
}
