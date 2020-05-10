/**
 * Field
 * A reuseable field element
 */

import React from 'react'

function uid(len) {
  len = len || 7
  return Math.random().toString(35).substr(2, len)
}

const defaultProps = {
  hint: null,
  element: 'input',
  type: 'text'
}

export default class Field extends React.Component {
  constructor(props) {
    super(props)

    this.fieldId = `col-field-${uid()}`
    this.hintId = `${this.fieldId}-hint`
  }

  getHint(hint) {
    return hint ? (
      <span id={this.hintId} className="col-field-hint">
        {hint}
      </span>
    ) : null
  }

  render() {
    let { hint, element: Element, label, ...props } = this.props

    let id = 'id' in props ? props.id : this.fieldId

    return (
      <label className="col-field" htmlFor={id}>
        <span className="col-field-label">{label}</span>

        <Element
          ref={(el) => (this.input = el)}
          id={id}
          className="col-field-input"
          aria-describedby={hint ? this.hintId : null}
          {...props}
        />
        {this.getHint(hint)}
      </label>
    )
  }
}

Field.defaultProps = defaultProps
