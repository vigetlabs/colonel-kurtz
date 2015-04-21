/**
 * Youtube Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

import Field   from '../common/field'
import Frame   from '../common/frame'
import Graphic from '../common/graphic'
import Player  from './player'
import React   from 'react'

let YouTube = React.createClass({

  propTypes: {
    content  : React.PropTypes.object.isRequired,
    onChange : React.PropTypes.func.isRequired,
    src      : React.PropTypes.string
  },

  getDefaultProps() {
    return {
      baseUrl: "https://www.youtube.com/embed/",
      content: {
        video_id: ''
      }
    }
  },

  getSrc(id) {
    var { baseUrl } = this.props
    return id ? baseUrl + id : null
  },

  render() {
    var { video_id } = this.props.content

    return (
      <div className="col-youtube">
        <Field label="YouTube Video ID" value={ video_id } name="youtube_video_id" onChange={ this._onChange } autofocus/>
        <Frame open={ video_id }>
          <Graphic element="iframe" src={ this.getSrc(video_id) } />
        </Frame>
      </div>
    )
  },

  _onChange(e) {
    this.props.onChange({ video_id: e.currentTarget.value })
  }

})

export default YouTube
