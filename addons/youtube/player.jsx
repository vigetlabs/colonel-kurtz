var React = require('react')

var _baseUrl = "https://www.youtube.com/embed/"

var Player = React.createClass({

  render() {
    var { video_id } = this.props

    return video_id ? (
      <div className="col-youtube-player">
        <iframe className="col-youtube-frame" src={ _baseUrl + video_id } frameBorder="0" allowFullScreen></iframe>
      </div>
    ) : null
  },

})

module.exports = Player
