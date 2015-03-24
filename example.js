/**
 * ColonelKurtz Example
 */

require('./example.css')

var ColonelKurtz = require('../src')

let blockTypes = [
  {
    id        : 'medium',
    icon      : 'icons/text.svg',
    label     : 'Create a new text block',
    component : require('../addons/medium')
  },
  {
    id        : 'image',
    icon      : 'icons/image.svg',
    label     : 'Create a new image block',
    component : require('../addons/image')
  },
  {
    id        : 'youtube',
    icon      : 'icons/youtube.svg',
    label     : 'Create a new YouTube block',
    component : require('../addons/youtube')
  }
]

var blocks = []

try {
  blocks = JSON.parse(localStorage.getItem('seed'))
} catch(x) {}

var editor = new ColonelKurtz({
  el    : document.getElementById('app'),
  seed  : { blocks, blockTypes },
  types : [ 'medium', 'image', 'youtube' ]
})

editor.listen(function() {
  let blocks = editor.toJSON()

  localStorage.setItem('seed', JSON.stringify(blocks))
})

editor.pump()

editor.render()
