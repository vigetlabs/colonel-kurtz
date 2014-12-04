var React   = require('react')

var Player = React.createClass({

  render() {
    var { src } = this.props

    return src ? (
      <div className="col-youtube-player">
        <iframe className="col-youtube-frame" src={ src } frameborder="0" allowfullscreen></iframe>
      </div>
    ) : null
  },

})

module.exports = Player
