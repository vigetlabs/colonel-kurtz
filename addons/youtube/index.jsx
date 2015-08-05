/**
 * Youtube Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

const Embedded = require('../common/embedded')
const React = require('react')

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
    const { baseUrl, content, onChange } = this.props

    return (<Embedded className="col-youtube"
                      title="YouTube Video ID"
                      baseUrl={ baseUrl }
                      name="video_id"
                      slug={ content.video_id }
                      onChange={ onChange } />)
  }

})

module.exports = YouTube
