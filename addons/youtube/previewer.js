var React  = require('react')
var Player = require('./player')

var Previewer = React.createClass({

  render() {
    return (
      <div className="col-youtube">
        <Player src={ this.props.src } />
      </div>
    )
  }

})

module.exports = Previewer
