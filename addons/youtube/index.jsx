/**
 * Youtube Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

const Embedded = require('../common/embedded')
const React = require('react')

function parseYouTube(value='') {
  let matches = value.match(/v=(.+)(&|$)/)
  return matches ? matches[1] : value
}

const YouTube = React.createClass({

  getDefaultProps() {
    return {
      baseUrl: "https://www.youtube.com/embed/",
      content: {
        video_id: ''
      }
    }
  },

  render() {
    const { baseUrl, content } = this.props

    return (<Embedded className="col-youtube"
                      title="YouTube Video ID"
                      baseUrl={ baseUrl }
                      name="video_id"
                      slug={ content.video_id }
                      onChange={ this._onChange } />)
  },

  _onChange({ video_id }) {
    this.props.onChange({ video_id: parseYouTube(video_id) })
  }
})

module.exports = YouTube
