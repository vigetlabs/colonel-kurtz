let Close     = require('./close')
let FocusTrap = require('react-focus-trap')
let React     = require('react')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      className        : 'col-dialog',
      headingComponent : 'h3'
    }
  },

  getTitle() {
    let { headingComponent, title } = this.props
    if (title) {
      return React.createElement(headingComponent, {
        className: "col-dialog-title"
      }, title)
    }
  },

  render() {
    let { active, children, className, onExit } = this.props

    return (
      <FocusTrap active={ active } className={ className } onExit={ onExit }>
        { this.getTitle() }
        { children }
        <Close onClick={ onExit } />
      </FocusTrap>
    )
  }

})
