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

var seed = {}

try {
  seed = JSON.parse(localStorage.getItem('seed')) || {}
  console.log('seed', seed)
} catch(x) {
  console.error(x)
}

let editor = new ColonelKurtz({
  el         : document.getElementById('app'),
  blockTypes : blockTypes,
  seed       : seed
})

editor.listen(function() {
  let data = editor.toJSON()
  localStorage.setItem('seed', JSON.stringify(data))
})

editor.render()
