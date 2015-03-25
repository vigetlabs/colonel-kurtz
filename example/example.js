/**
 * ColonelKurtz Example
 */

require('./example.css')

import ColonelKurtz from '../src'

let blockTypes = [
  {
    id        : 'medium',
    label     : 'Text',
    component : require('../addons/medium')
  },
  {
    id        : 'image',
    label     : 'Image',
    component : require('../addons/image')
  },
  {
    id        : 'youtube',
    label     : 'YouTube',
    component : require('../addons/youtube')
  }
]

var blocks = []

try {
  blocks = JSON.parse(localStorage.getItem('seed')) || []
} catch(x) {}

let editor = new ColonelKurtz({
  el   : document.getElementById('app'),
  seed : { blocks, blockTypes }
})

editor.listen(function() {
  localStorage.setItem('seed', JSON.stringify(editor.toJSON()))
})

editor.render()
