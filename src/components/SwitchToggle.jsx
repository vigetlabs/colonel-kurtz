let Btn        = require('./Button')
let React      = require('react')
let classNames = require('classnames')

module.exports = React.createClass({

  propTypes: {
    onClick : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      label     : 'Open block creation menu',
      hide      : false,
      secondary : false,
      symbol    : '+'
    }
  },

  render() {
    let { label, hide, onClick, secondary, symbol } = this.props

    let className = classNames('col-btn-fab', {
      'col-btn-fab-secondary' : secondary
    })

    return (
      <Btn ref="toggle" className={ className } onClick={ onClick } hide={ hide }>
        <span className="col-hidden">{ label }</span>
        <span aria-hidden="true">{ symbol }</span>
      </Btn>
    )
  }

})
