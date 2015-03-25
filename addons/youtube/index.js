/**
 * Image Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

import Field   from '../common/field'
import Player  from './player'
import React   from 'react'

require('./style')

let YouTube = React.createClass({

  propTypes: {
    content  : React.PropTypes.object.isRequired,
    onChange : React.PropTypes.func.isRequired,
    src      : React.PropTypes.string
  },

  getDefaultProps() {
    return {
      content: {
        video_id: ''
      }
    }
  },

  render() {
    var { video_id } = this.props.content

    return (
      <div>
        <div className="col-youtube">
          <Player video_id={ video_id } />

          <fieldset className="col-youtube-fieldset">
            <Field label="YouTube Video ID" value={ video_id } name="youtube_video_id" onChange={ this._onChange }/>
          </fieldset>

        </div>
        { this.props.children }
      </div>
    )
  },

  _onChange(e) {
    this.props.onChange({ video_id: e.currentTarget.value })
  }

})

export default YouTube
