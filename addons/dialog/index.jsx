let Close     = require('./close')
let FocusTrap = require('react-focus-trap')
let React     = require('react')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      className: 'col-dialog'
    }
  },

  render() {
    let { active, children, className, onExit } = this.props

    return (
      <FocusTrap active={ active } className={ className } onExit={ onExit }>
        { children }
        <Close onClick={ onExit } />
      </FocusTrap>
    )
  }

})
