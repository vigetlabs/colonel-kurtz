ColonelKurtz.addBlockType('text', {

  defaultContent: function() {
    return {
      text: "I'm a plain text block."
    };
  },

  renderEditor: function() {
    return this.React.createElement('div', {
      'aria-multiline': 'true',
      className: 'colonel-block-editor',
      contentEditable: true,
      onBlur: this.onEditorBlur,
      ref: 'editor',
      role: 'textarea'
    }, this.state.content.text)
  },

  renderPreviewer: function() {
    return this.React.createElement('p', null, this.state.content.text)
  },

  onEditorBlur: function() {
    this.setContent({
      text: this.refs.editor.getDOMNode().innerHTML
    })
  }

})

ColonelKurtz.addBlockType('medium', ColonelKurtz.addons.Medium)

var editor = new ColonelKurtz(document.getElementById('app')).render()
var output = document.getElementById('output')

editor.addCallback(function(json) {
  output.value = JSON.stringify(json, null, 4)
})
