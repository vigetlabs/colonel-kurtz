/**
 * ColonelKurtz Example
 */

require('./example.css')

import ColonelKurtz from '../src'

let blockTypes = [
  {
    id        : 'section',
    label     : 'Section',
    component : require('./blockTypes/Section'),
    types     : [ 'medium', 'image', 'youtube' ]
  },
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

editor.addPlugin(require('./plugins/storage'))

editor.start()
