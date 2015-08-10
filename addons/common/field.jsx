/**
 * Field
 * A reuseable field element
 */

let React = require('react')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      element : 'input',
      type    : 'text'
    }
  },

  render() {
    var { label, element:Element, value, ...props } = this.props

    return (
      <div className="col-field">
        <label className="col-field-label">
          { label }
          <Element ref="input" className="col-field-input" defaultValue={ value } { ...props } />
        </label>
      </div>
    )
  }

})
