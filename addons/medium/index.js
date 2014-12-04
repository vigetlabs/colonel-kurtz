/**
 * Medium Colonel Kurtz Addon
 * This component adds a medium.com-like rich text editor block type.
 *
 * Source for this component can be found here:
 * https://github.com/daviferreira/medium-editor
 *
 * @flow
 */

var Editor    = require('./editor')
var Previewer = require('./previewer')
var React     = require('react')

require('./vendor/medium-editor/style')

var Medium = {

  defaultContent(): { html: string } {
    return { html: '' }
  },

  renderEditor(): any {
    return <Editor onBlur={ this.setContent } { ...this.state.content } />
  },

  renderPreviewer(): any {
    return <Previewer { ...this.state.content } />
  }

}

module.exports = Medium
