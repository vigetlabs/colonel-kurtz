let Button = require('./Button')
let React  = require('react')

module.exports = React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired,
    label : React.PropTypes.string.isRequired,
    id    : React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      className : 'col-menu-item',
      type      : 'button',
      onClick() {},
      onBeforeClick() {},
      isDisabled() {}
    }
  },

  isDisabled() {
    let { app, block, isDisabled } = this.props
    return isDisabled(app, block)
  },

  render() {
    let { label, ...safe } = this.props

    return (
      <Button { ...safe } onClick={ this._onClick } disabled={ this.isDisabled() }>
        { label }
      </Button>
    )
  },

  _onClick() {
    let { app, block, id, onClick, onBeforeClick } = this.props

    // Give the developer a chance to "catch" menu items
    // before they are processed
    if (onBeforeClick(id) !== false) {
      onClick(app, block)
    }
  }

})
