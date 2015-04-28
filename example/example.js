/**
 * ColonelKurtz Example
 */

import ColonelKurtz from '../src/Colonel'

let blockTypes = [
  {
    id        : 'section',
    label     : 'Section',
    component : require('../addons/section'),
    types     : [ 'medium', 'image', 'youtube' ],
    menuItems : [{
      id    : 'settings',
      label : 'Settings'
    }]
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
