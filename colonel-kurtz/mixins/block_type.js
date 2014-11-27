/* @flow */

var React        = require('react')
var AppConstants = require('constants/app_constants')
var invariant    = require('react/lib/invariant')
var Pure         = require('mixins/pure')

var BlockType = {

  mixins: [Pure],

  getInitialState() {
    if (__DEV__) {
      invariant(this.defaultContent, "BlockType mixin requires `defaultContent` implementation.");
    }

    return {
      content: this.props.initialContent || this.defaultContent()
    }
  },

  setContent(content) {
    this.setState({ content: content }, function() {
      this.props.updateContent(this.state.content)
    })
  },

  editMode() {
    return this.props.mode === AppConstants.EDIT_MODE
  },

  render() {
    if (__DEV__) {
      invariant(this.renderEditor, "BlockType mixin requires `renderEditor` implementation.");
      invariant(this.renderPreviewer, "BlockType mixin requires `renderPreviewer` implementation.");
    }

    return this.editMode() ? this.renderEditor() : this.renderPreviewer()
  }

}

module.exports = BlockType
