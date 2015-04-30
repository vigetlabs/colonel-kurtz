/**
 * Field
 * A reuseable field element
 */

let React = require('react')

module.exports = React.createClass({

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
