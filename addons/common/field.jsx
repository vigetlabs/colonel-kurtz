/**
 * Field
 * A reuseable field element
 */

let React = require('react')
let uid   = require('uid')

let Field = React.createClass({

  getDefaultProps() {
    return {
      hint    : null,
      element : 'input',
      type    : 'text'
    }
  },

  getInitialState() {
    return {
      hintId: `hint-col-field-${uid()}`
    }
  },

  getHint(hint) {
    return hint ? (<span id={ this.state.hintId } className="col-field-hint">{ hint }</span>) : null
  },

  render() {
    let { hint, element:Element, label, value, ...props } = this.props
    let { hintId } = this.state

    return (
      <label className="col-field">
        <span className="col-field-label">{ label }</span>

        <Element ref="input" className="col-field-input" aria-describedby={ hint ? hintId : null } defaultValue={ value } { ...props } />
        { this.getHint(hint) }
      </label>
    )
  }

})

module.exports = Field
