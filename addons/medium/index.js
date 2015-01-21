/**
 * This component adds a medium.com-like rich text editor block type.
 *
 * Source for this component can be found here:
 * https://github.com/daviferreira/medium-editor
 */

var Editor    = require('./editor')
var Previewer = require('./previewer')
var React     = require('react')

require('./style')

var Medium = {

  defaultContent() {
    return { html: '', text: '' }
  },

  renderEditor() {
    return <Editor onBlur={ this.setContent } { ...this.state.content } />
  },

  renderPreviewer() {
    return <Previewer { ...this.state.content } />
  }

}

module.exports = Medium
