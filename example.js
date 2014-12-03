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
    return this.React.createElement('p', null, this.state.content.html)
  },

  onEditorBlur: function() {
    var el = this.refs.editor.getDOMNode()

    this.setContent({
      text: el.textContent,
      html: el.innerHTML
    })
  }

})

ColonelKurtz.addBlockType('medium', ColonelKurtz.addons.Medium)

var seed = {};

try {
  seed = JSON.parse(localStorage.getItem('seed'))
} catch(x) {}

var editor = new ColonelKurtz({
  el   : document.getElementById('app'),
  seed : seed
}).render()

var output = document.getElementById('output')

editor.addCallback(function(json) {
  output.value = JSON.stringify(json, null, 4)
  localStorage.setItem('seed', JSON.stringify(json))
})
