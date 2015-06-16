/**
 * ColonelKurtz Example
 */

require('./example.scss')

let ColonelKurtz = require('../src/Colonel')

let blockTypes = [
  {
    id          : 'section',
    label       : 'Section',
    component   : require('./blockTypes/Section'),
    types       : [ 'child-text', 'image', 'youtube' ],
    maxChildren : 3
  },
  {
    id        : 'medium',
    label     : 'Text',
    component : require('../addons/medium')
  },
  {
    id        : 'child-text',
    label     : 'Child Text',
    component : require('../addons/medium'),
    root      : false
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
  el          : document.getElementById('app'),
  blockTypes  : blockTypes,
  maxChildren : 5
})

editor.addPlugin(require('./plugins/storage'))

editor.start()
