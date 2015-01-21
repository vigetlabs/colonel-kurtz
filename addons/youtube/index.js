/**
 * Image Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

var Editor    = require('./editor')
var Previewer = require('./previewer')
var React     = require('react')

var YouTube = {

  defaultContent() {
    return { video_id: '' }
  },

  renderEditor() {
    return <Editor onChange={ this.setContent } { ...this.state.content } />
  },

  renderPreviewer() {
    return <Previewer { ...this.state.content } />
  }

}

module.exports = YouTube
