let Btn   = require('./Button')
let React = require('react')
let DOM   = require('react-dom')

module.exports = React.createClass({

  propTypes: {
    label   : React.PropTypes.string.isRequired,
    onClick : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      className : 'col-btn-fab',
      symbol    : '+'
    }
  },

  focus() {
    DOM.findDOMNode(this).focus()
  },

  render() {
    let { className, disabled, label, onClick, symbol } = this.props

    return (
      <Btn className={ className } onClick={ onClick } disabled={ disabled }>
        <span className="col-hidden">{ label }</span>
        <span aria-hidden="true">{ symbol }</span>
      </Btn>
    )
  }

})
