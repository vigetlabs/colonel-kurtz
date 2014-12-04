var React = require('react')

var _baseUrl = "https://www.youtube.com/embed/"

var Player = React.createClass({

  render() {
    var { src } = this.props

    return src ? (
      <div className="col-youtube-player">
        <iframe className="col-youtube-frame" src={ _baseUrl + src } frameBorder="0" allowFullScreen></iframe>
      </div>
    ) : null
  },

})

module.exports = Player
