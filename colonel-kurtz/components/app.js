/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 *
 * @flow
 */

var BlockListStore = require('../stores/block_list_store')
var Modes          = require('../constants/mode_constants')
var ContentSection = require('./content_section')
var ModeSelection  = require('./mode_selection')
var Monitor        = require('../mixins/monitor')
var React          = require('react')
var Types          = React.PropTypes

var App = React.createClass({

  mixins: [ Monitor ],

  propTypes: {
    editorId: Types.number.isRequired
  },

  getInitialState(): Object {
    return {
      mode: Modes.EDIT_MODE
    }
  },

  getState(): Object {
    return {
      blockList: BlockListStore.findByEditorId(this.props.editorId)
    }
  },

  render(): any {
    var { blockList, mode } = this.state

    return (
      <div className="colonel">
        <ModeSelection mode={ mode } onChange={ this._onModeChange } />
        <ContentSection mode={ mode } initialBlockListId={ blockList.id } />
      </div>
    )
  },

  _onModeChange(mode): void {
    this.setState({ mode })
  }

})

module.exports = App
