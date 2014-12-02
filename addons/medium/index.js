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

var Medium = {

  defaultContent(): { html: string } {
    return { html: '' }
  },

  renderEditor(): any {
    return <Editor onBlur={ this.setContent } html={ this.state.content.html } />
  },

  renderPreviewer(): any {
    return <Previewer html={ this.state.content.html } />
  }

}

module.exports = Medium
