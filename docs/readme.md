# Colonel Kurtz

1. [Terminology](#terminology)
2. [Creating an Editor](#creating-an-editor)
3. [Exporting Data](#exporting-data)
4. [Adding Block Types](#adding-block-types)

## Terminology

Colonel Kurtz is a block based content editor. On their own, these
words are vague. Here is what we mean:

### Blocks

The data structure for Colonel Kurtz breaks down into a series of
objects that contain content and pieces of child content. We call
these objects `blocks`.

More on the specifics of blocks can be found within `blocks.md`.

### Block Types

Although blocks describe the _data_ associated with a piece of
content, they do not describe the _context_ around them. Block Types
fulfill this purpose - to frame the context around how a block should
be used.

Additionally, block types define the editing experience for a block;
they define what types of properties a block can manage. If JSON is
the _view_, and blocks are _model_, block types could be described as
the _controller_.

More on the specifics of block types, including how to define new
ones, can be found inside `blockTypes.md`.

## Creating an Editor

Colonel Kurtz is a standard JavaScript constructor, which means you
can create _new_ editors:

```javascript
let box   = document.getElementById('#box')
let input = document.getElementById('#textarea')

var myEditor = new ColonelKurtz({
  el     : box,
  blocks : input
})
```

This is the bear minimum for Colonel Kurtz (although it won't do
much). The important elements are `el` and `value`.

`el` defines where Colonel Kurtz will render to. It can be an empty
`<div>` or some other element that exists on your page. If you are
adventurous, you could consider rendering it to a new element
using `document.createElement('div')` and then appending it whereever
you want.

`blocks` sets the initial state of the editor. This should be a value
previously created by Colonel Kurtz.

## Exporting data

You can get the value out of Colonel Kurtz at any time with:

```javascript
myEditor.toJSON()
```

This isn't particularly useful on its own, however you can also
_listen_ to when Colonel Kurtz has changed:

```javascript
myEditor.listen(function() {
  textarea.value = myEditor.toJSON()
})
```

## Adding Block Types

Additional block types can be added when you create an instance of
Colonel Kurtz:

```javascript
var myEditor = new ColonelKurtz({
  //...
  blockTypes: [{
    id: 'video',
    label: 'Video',
    component: require('colonel-kurtz/addons/youtube')
  }]
})
```

This is described in greater detail within `blockTypes.md`.
