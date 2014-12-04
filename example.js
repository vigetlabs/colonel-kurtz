ColonelKurtz.addBlockType({
  id: 'medium',
  component: ColonelKurtz.addons.Medium
})

ColonelKurtz.addBlockType({
  id: 'image',
  component: ColonelKurtz.addons.Image
})

ColonelKurtz.addBlockType({
  id: 'list',
  nest: ['medium'],
  component: {
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
  el   : document.getElementById('app'),
  seed : seed
}).render()

var output = document.getElementById('output')

editor.addCallback(function(json) {
  output.value = JSON.stringify(json, null, 4)
  localStorage.setItem('seed', JSON.stringify(json))
})
