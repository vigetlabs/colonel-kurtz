let React   = require('react')
let Strings = require('constants/strings')
let Button  = require('./ui/button')

let Fullscreen = React.createClass({

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
