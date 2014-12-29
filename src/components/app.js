/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 *
 * @flow
 */

var BlockListStore = require('../stores/block_list_store')
var ContentSection = require('./content_section')
var EditorStore    = require('../stores/editor_store')
var ModeSelection  = require('./mode_selection')
var Monitor        = require('../mixins/monitor')
var React          = require('react')
var Types          = React.PropTypes

var App = React.createClass({

  mixins: [ Monitor ],

  propTypes: {
    editorId: Types.number.isRequired
  },

  getState(): Object {
    return {
      blockList : BlockListStore.findByEditorId(this.props.editorId),
      editor    : EditorStore.find(this.props.editorId)
    }
  },

  render(): any {
    var { blockList, editor } = this.state

    return (
      <div className="colonel">
        <ModeSelection editor={ editor } />
        <ContentSection editor={ editor } initialBlockListId={ blockList.id } />
      </div>
    )
  }

})

module.exports = App
