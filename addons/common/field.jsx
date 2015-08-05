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

  getName() {
    return this.props.name || this.props.id
  },

  render() {
    var { label, element:Element, ...props } = this.props

    return (
      <div className="col-field">
        <label className="col-field-label" htmlFor={ this.getName() }>{ label }</label>
        <Element ref="input" className="col-field-input" { ...props } name={ this.getName() } />
      </div>
    )
  }

})
