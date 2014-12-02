/* Begin: Common Block Type Interface
 *
 * Each block type component must include the BlockType mixin and implement:
 * - defaultContent()
 * - renderEditor()
 * - renderPreviewer()
 *
 * Block content is managed via calls to setContent(), which updates both
 * this component's state as well as the block instance's content.
 *
 * @flow
 */

var React     = require('react')
var Modes     = require('../constants/mode_constants')
var invariant = require('react/lib/invariant')

var BlockType = {

  getInitialState(): Object {
    if (__DEV__) {
      invariant(this.defaultContent, "BlockType mixin requires `defaultContent` implementation.");
    }

    return {
      content: this.props.initialContent || this.defaultContent()
    }
  },

  setContent(content:string): void {
    this.setState({ content }, function() {
      this.props.updateContent(this.state.content)
    })
  },

  editMode(): boolean {
    return this.props.mode === Modes.EDIT_MODE
  },

  render(): ReactElement {
    if (__DEV__) {
      invariant(this.renderEditor, "BlockType mixin requires `renderEditor` implementation.");
      invariant(this.renderPreviewer, "BlockType mixin requires `renderPreviewer` implementation.");
    }

    return this.editMode() ? this.renderEditor() : this.renderPreviewer()
  }

}

module.exports = BlockType
