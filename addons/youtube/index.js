/**
 * Youtube Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

import React from 'react'
import Embedded from '../common/embedded'

const getYouTubeID = new RegExp(
  '(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})',
  'i'
)

function parseYouTube(value = '') {
  let matches = value.match(getYouTubeID)
  return matches ? matches[1] : value
}

export default class YouTube extends React.Component {
  static defaultProps = {
    baseUrl: 'https://www.youtube.com/embed/',
    content: {
      video_id: ''
    }
  }

  render() {
    const { baseUrl, content } = this.props

    return (
      <Embedded
        className="col-youtube"
        title="YouTube Video"
        hint="This can either be a video ID or URL. The video's unique ID will be saved."
        baseUrl={baseUrl}
        name="video_id"
        slug={content.video_id}
        onChange={this._onChange.bind(this)}
      />
    )
  }

  _onChange({ video_id }) {
    this.props.onChange({ video_id: parseYouTube(video_id) })
  }
}
