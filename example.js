/**
 * ColonelKurtz Example
*/

require('./example.css')

var ColonelKurtz = require('../src');

ColonelKurtz.addBlockType({
  id        : 'medium',
  icon      : 'icons/text.svg',
  label     : 'Create a new text block',
  component : ColonelKurtz.addons.Medium
})

ColonelKurtz.addBlockType({
  id        : 'image',
  icon      : 'icons/image.svg',
  label     : 'Create a new image block',
  component : ColonelKurtz.addons.Image
})

ColonelKurtz.addBlockType({
  id        : 'youtube',
  icon      : 'icons/youtube.svg',
  label     : 'Create a new YouTube block',
  component : ColonelKurtz.addons.YouTube
})

ColonelKurtz.addBlockType({
  id        : 'list_item',
  icon      : 'icons/add.svg',
  label     : 'Create a new list item',
  component : ColonelKurtz.addons.Medium
})

ColonelKurtz.addBlockType({
  id        : 'list',
  icon      : 'icons/list.svg',
  label     : 'Create a new list block',
  types     : [ 'list_item' ],
  component : {
    defaultContent  : function() { return null },
    renderEditor    : function() { return null },
    renderPreviewer : function() { return null }
  }
})


var seed = {};

try {
  seed = JSON.parse(localStorage.getItem('seed'))
} catch(x) {}

var editor = new ColonelKurtz({
  el    : document.getElementById('app'),
  seed  : seed,
  types : [ 'medium', 'image', 'youtube', 'list' ]
}).render()

var output = document.getElementById('output')

editor.addCallback(function(json) {
  output.value = JSON.stringify(json, null, 4)
  localStorage.setItem('seed', JSON.stringify(json))
})
