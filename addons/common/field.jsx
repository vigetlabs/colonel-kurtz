/**
 * Field
 * A reuseable field element
 */

import React from 'react'
import './style'

export default React.createClass({

  getDefaultProps() {
    return {
      type: 'text'
    }
  },

  render() {
    var { label, name, type, ...props } = this.props

    return (
      <div className="col-field">
        <label className="col-field-label" htmlFor={ name || this.props.id }>{ label }</label>
        <input className="col-field-input" type={ type } { ...props } name={ name || this.props.id } />
      </div>
    )
  }

})
