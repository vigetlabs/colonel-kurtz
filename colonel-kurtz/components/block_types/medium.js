/* @flow */

var React        = require('react')
var MediumEditor = require('vendor/medium-editor')
var BlockType    = require('mixins/block_type')

require('vendor/medium-editor/style')

var Medium = React.createClass({

  // Begin: Common Block Type Interface
  //
  // Each block type component must include the BlockType mixin and implement:
  // - defaultContent()
  // - renderEditor()
  // - renderPreviewer()
  //
  // Block content is managed via calls to setContent(), which updates both
  // this component's state as well as the block instance's content.

  mixins: [ BlockType ],

  shouldComponentUpdate(props: Object, state: Object): boolean {
    return false
  },

  defaultContent(): { html: string } {
    return {
      html: ''
    }
  },

  renderEditor(): any {
    return (
      <div className="colonel-block-content">
        <div className="colonel-block-editor" onBlur={ this.onEditorBlur } role="textarea" aria-multiline="true" ref="editor" dangerouslySetInnerHTML={{ __html: this.state.content.html }} />
      </div>
    )
  },

  renderPreviewer(): any {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.content.html }}></div>
    )
  },

  // End: Common Block Type Interface

  componentDidMount(): void {
    if (this.editMode()) {
      this.setState({
        editor: new MediumEditor(this.refs.editor.getDOMNode(), this.props.options)
      })
    }
  },

  componentWillUnmount(): void {
    if (this.editMode()) {
      this.state.editor.deactivate()
    }
  },

  onEditorBlur(): void {
    var htmlContent = { html: this.refs.editor.getDOMNode().innerHTML }
    this.setContent(htmlContent)
  },

})

module.exports = Medium
