var React       = require('react')
var Strings     = require('constants/strings')
var Button      = require('./ui/button')

var Fullscreen = React.createClass({

  propTypes: {
    onClick : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      'aria-label' : Strings.fullscreen,
      'className'  : 'col-btn-icon col-fullscreen',
      'type'       : 'button'
    }
  },

  render(): any {
    return <Button { ...this.props }>Fullscreen</Button>
  }

})

module.exports = Fullscreen
