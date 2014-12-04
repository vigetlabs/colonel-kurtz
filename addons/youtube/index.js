/**
 * Image Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 *
 * @flow
 */

var Editor    = require('./editor')
var Previewer = require('./previewer')
var React     = require('react')

require('./style')

var YouTube = {

  defaultContent(): { src: string } {
    return { video_id: '' }
  },

  renderEditor(): any {
    return <Editor onChange={ this.setContent } { ...this.state.content } />
  },

  renderPreviewer(): any {
    return <Previewer { ...this.state.content } />
  }

}

module.exports = YouTube
