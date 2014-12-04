var React = require('react')

var Previewer = React.createClass({

  render() {
    return (
      <div className="col-youtube">
        <Player src={ src } />
      </div>
    )
  }

})

module.exports = Previewer
