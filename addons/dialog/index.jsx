let Close     = require('./close')
let FocusTrap = require('react-focus-trap')
let React     = require('react')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      className: 'col-dialog'
    }
  },

  getTitle() {
    let { title } = this.props
    if (this.props.title) {
      return (
        <h3 className="col-dialog-title">
          { this.props.title }
        </h3>
      )
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
