var React = require('react')
var cx    = require('classnames')

var Player = React.createClass({

  getDefaultProps() {
    return {
      baseUrl: "https://www.youtube.com/embed/"
    }
  },

  getSrc() {
    var { baseUrl, video_id } = this.props

    return video_id ? baseUrl + video_id : null
  },

  render() {
    let className = cx('col-youtube-player', {
      'col-youtube-player-open': this.props.video_id
    })

    return (
      <div className={ className }>
        <iframe className="col-youtube-frame" src={ this.getSrc() } frameBorder="0" allowFullScreen></iframe>
      </div>
    )
  },

})

module.exports = Player
