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

let editor = new ColonelKurtz({
  el         : document.getElementById('app'),
  blockTypes : blockTypes
})

//editor.addPlugin(require('./plugins/storage'))

editor.start()
