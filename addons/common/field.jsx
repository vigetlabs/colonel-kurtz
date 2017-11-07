/**
 * Field
 * A reuseable field element
 */

let React = require('react')

function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}

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
    let { hint, element:Element, label, ...props } = this.props
    let { hintId } = this.state

    return (
      <label className="col-field">
        <span className="col-field-label">{ label }</span>

        <Element ref={ (el) => this.input = el } className="col-field-input" aria-describedby={ hint ? hintId : null } { ...props } />
        { this.getHint(hint) }
      </label>
    )
  }

})

module.exports = Field
