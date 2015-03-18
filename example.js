/**
 * ColonelKurtz Example
 */

require('./example.css')

var ColonelKurtz = require('../src')

ColonelKurtz.addBlockTypes(
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
  },

  {
    id        : 'list_item',
    icon      : 'icons/add.svg',
    label     : 'Create a new list item',
    component : require('../addons/medium')
  },

  {
    id        : 'list',
    icon      : 'icons/list.svg',
    label     : 'Create a new list block',
    types     : [ 'list_item' ],
    component : {
      defaultContent  : function() { return null },
      render          : function() { return null }
    }
  }
)

var seed = {}

try {
  seed = JSON.parse(localStorage.getItem('seed'))
} catch(x) {}

var editor = new ColonelKurtz({
  el      : document.getElementById('app'),
  seed    : seed,
  types   : [ 'medium', 'image', 'youtube', 'list' ]
})

var output = document.getElementById('output')

editor.addCallback(function(json) {
  output.value = JSON.stringify(json, null, 4)
  localStorage.setItem('seed', JSON.stringify(json))
})

editor.render()
