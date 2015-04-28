import Button from './Button'
import React  from 'react'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired,
    label : React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      className : 'col-menu-item',
      type      : 'button',
      onClick() {},
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
    let { app, block, onClick } = this.props
    onClick(app, block)
  }

})
