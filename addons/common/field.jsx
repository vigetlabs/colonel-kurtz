/**
 * Field
 * A reuseable field element
 */

let React   = require('react')
let slugify = require('./slugify')

module.exports = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      element : 'input',
      type    : 'text'
    }
  },

  getID() {
    return this.props.id || this.props.name || slugify(this.props.label)
  },

  getName() {
    return this.name || this.getID()
  },

  render() {
    let { label, name, type, element:Element, id, ...props } = this.props

    return (
      <div className="col-field">
        <label className="col-field-label" htmlFor={ this.getID() }>{ label }</label>
        <Element className="col-field-input" type={ type } { ...props } name={ this.getName() } id={ this.getID() } />
      </div>
    )
  }

})
