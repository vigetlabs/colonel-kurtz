let Btn        = require('./Button')
let React      = require('react')
let classNames = require('classnames')

module.exports = React.createClass({

  propTypes: {
    onClick : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      className : 'col-btn-fab',
      label     : 'Open block creation menu',
      secondary : false,
      symbol    : '+'
    }
  },

  focus() {
    this.getDOMNode().focus()
  },

  render() {
    let { className, label, onClick, secondary, symbol } = this.props

    return (
      <Btn className={ className } onClick={ onClick }>
        <span className="col-hidden">{ label }</span>
        <span aria-hidden="true">{ symbol }</span>
      </Btn>
    )
  }

})
