var TextBlock = ColonelKurtz.createBlock({
  defaultContent: function() {
    return {
      text: "I'm a plain text block."
    };
  },

  renderEditor: function() {
    var editor = this.React.createElement('div', { className: 'colonel-block-editor', onBlur: this.onEditorBlur, role: 'textarea', 'aria-multiline': 'true', ref: 'editor', contentEditable: true }, this.state.content.text);
    return this.React.createElement('div', { className: 'colonel-block-content' }, editor);
  },

  renderPreviewer: function() {
    return this.React.createElement('p', null, this.state.content.text);
  },

  onEditorBlur: function() {
    var content = { text: this.refs.editor.getDOMNode().innerHTML };
    this.setContent(content);
  }
});

ColonelKurtz.addBlockType('text', TextBlock);

new ColonelKurtz(document.getElementById('app')).render();
