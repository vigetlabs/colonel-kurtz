/**
 * Field
 * A reuseable field element
 */

import React from 'react'

function uid(len) {
  len = len || 7
  return Math.random()
    .toString(35)
    .substr(2, len)
}

const defaultProps = {
  hint: null,
  element: 'input',
  type: 'text'
}

export default class Field extends React.Component {
  constructor() {
    super(...arguments)

    this.state = {
      hintId: `hint-col-field-${uid()}`
    }
  }

  getHint(hint) {
    return hint ? (
      <span id={this.state.hintId} className="col-field-hint">
        {hint}
      </span>
    ) : null
  }

  render() {
    let { hint, element: Element, label, ...props } = this.props
    let { hintId } = this.state

    return (
      <label className="col-field">
        <span className="col-field-label">{label}</span>

        <Element
          ref={el => (this.input = el)}
          className="col-field-input"
          aria-describedby={hint ? hintId : null}
          {...props}
        />
        {this.getHint(hint)}
      </label>
    )
  }
}

Field.defaultProps = defaultProps
