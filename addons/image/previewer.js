var React   = require('react')
var Graphic = require('./graphic')

var Previewer = React.createClass({

  render() {
    return <Graphic {...this.props } />
  }

})

module.exports = Previewer
