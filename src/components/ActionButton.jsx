let Btn   = require('./Button')
let React = require('react')

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
    this.getDOMNode().focus()
  },

  render() {
    let { className, label, onClick, symbol } = this.props

    return (
      <Btn className={ className } onClick={ onClick }>
        <span className="col-hidden">{ label }</span>
        <span aria-hidden="true">{ symbol }</span>
      </Btn>
    )
  }

})
