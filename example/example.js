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
    types       : [ 'child-text', 'image', 'youtube', 'section' ],
    maxChildren : 3
  },
  {
    id        : 'medium',
    label     : 'Medium Editor',
    component : require('../addons/medium'),
    group     : 'Rich Text'
  },
  {
    id        : 'embed',
    label     : 'Embed',
    component : require('../addons/html-embed')
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
    group     : 'Media',
    component : require('../addons/image')
  },
  {
    id        : 'youtube',
    label     : 'YouTube',
    group     : 'Media',
    component : require('../addons/youtube')
  }
]

let editor = new ColonelKurtz({
  el          : document.getElementById('app'),
  blockTypes  : blockTypes,
  maxChildren : 5,
  maxDepth    : 3
})

editor.start()
