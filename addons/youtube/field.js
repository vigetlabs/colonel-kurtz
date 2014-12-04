/**
 * @jsx
 * @flow
 */

var React = require('react')
var Types = React.PropTypes

var Field = React.createClass({

  render(): any {
    var { label, name, type, ...props } = this.props

    return (
      <div className="col-img-field">
        <label className="col-img-label" htmlFor={ name || this.props.id }>
          { label }
        </label>
        <input className="col-img-input" type={ type } { ...props } name={ name || this.props.id } />
      </div>
    )
  }

})

module.exports = Field
