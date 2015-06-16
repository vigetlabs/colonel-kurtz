# Colonel

1. [Options](#options)
2. [Walk-through](#walk-through)

## Options

Name        | Description
----------- | -----------
el          | A DOM element used to render the editor
blocks      | The initial starting "seed" blocks for the instance
blockTypes  | Block Types to use for this editor, see `blockTypes.md`
maxChildren | The maximum number of root level blocks
allow       | A whitelist of block type ids.

## Walk-through

Integrating Colonel Kurtz remains relatively low level. The motivation
behind this is simply to evaluate how the library is used on projects
before prematurely optimizing for less useful situations.

That means that there are a couple of required steps, unlike the
experience of many jQuery plugins (such as
[Chosen](http://harvesthq.github.io/chosen/))

Before we begin, we should note that for this example (and for Colonel
Kurtz generally) we assume the following:

1. Your project is setup with something that can compile CommonJS from
[`npm`](https://www.npmjs.com/),
such as [browserify](http://browserify.org/) or
[webpack](https://github.com/webpack/webpack).
2. Familiarity and ability to include [Sass](http://sass-lang.com/)

### Basic markup

Colonel Kurtz must be instantiated onto a page, however it doesn't
create its own container markup. For the purposes of this example,
we'll work with the following html:

```html
<div id="container"></div>
<input type="hidden" id="input" />
```

`#container` will eventually contain our instance of Colonel
Kurtz. #input is a hidden input so that we can dump the latest JSON
from the editor in without exposing JSON to the end user.

### Setting up Colonel

Assuming markup from the prior section, let's begin. First, if you
haven't pulled down Colonel Kurtz from
[`npm`](https://www.npmjs.com/package/colonel-kurtz), install it:

```bash
npm install --save colonel-kurtz
```

After that finishes, we need to select the container for Colonel Kurtz
and the input that we want to update.

```javascript
var Colonel = require('colonel-kurtz')

var container = document.querySelector("#container")
var input     = document.querySelector("#input")

var editor = new ColonelKurtz({
  el: container,
  blocks: input
})

editor.start()
```

That's it, for now at any rate. Since `#input` is a DOM element, the
`blocks` key will safely pull JSON out of the input and parse it for
you. It also accepts a JavaScript array, if you would like to do this
process manually.

`editor.start()` tells the editor to boot up and render. This is an
important step! It tells Colonel Kurtz to run through all of its
available plugins (plugins are not discussed in this tutorial) and
then renders the editor to the screen.

### Basic Styling

Colonel Kurtz comes with a
[Material Design](http://www.google.com/design/spec/material-design/introduction.html)
inspired set of styles. These are available in the `./style` directory
of this repo, however we also include it with the `npm` package to
make sure that future updates do not make it impossible to retrieve
older style revisions.

For this tutorial, we will not go into detail about how to include
Sass on your project, however it is important to note that the main
entry point for our stylesheet is at `./style/colonel.scss`.

### Adding a new block type

At this point, the editor is set up. However you can't manage any
content yet. This is because no block types have been defined.

A block type is a simple JavaScript object of settings. Colonel Kurtz
comes with a Youtube plugin out of the box. Let's include it in our
editor:

```javascript
var Colonel = require('colonel-kurtz')

var container = document.querySelector("#container")
var input     = document.querySelector("#input")

var editor = new ColonelKurtz({
  el: container,
  blocks: input,
  blockTypes: [{
    id: 'youtube',
    label: 'Youtube',
    component: require('colonel-kurtz/build/addons/youtube')
  }]
})

editor.start()
```

In the code above, we've added a `blockTypes` field that includes the
YouTube plugin. Let's go over the fields for a block type that we've
passed here:

1. **id**: A unique identifier for the block type. This maps to the
   `type` property saved for a block and helps the editor know what
   React Component to use when editing the content.
2. **label**: This is a display name for the block type in the
   editor. When only one block type exists, it will not
   display. However when more than one block type is included the
   "plus" button to add a new block will expand into a menu of
   available block types. Additionally, this label is used for
   accessibility purposes in other parts of the editor.
3. **component**: A React component. Colonel Kurtz sends information
   to this component that allows it to present information for a block
   and update it in a particular way.

When these new settings have been added, you should see a "plus"
button in your editor. This should create a new YouTube block.

You may also notice that this block does not look fantastic. The
Youtube addon relies on a common library of utilities for Colonel
Kurtz addons. The stylesheet for those components can be found here:

https://github.com/vigetlabs/colonel-kurtz/blob/master/addons/common/style.scss

### Saving data

Colonel Kurtz editors emit an event when they change. You can listen
to this and update your input with:

```javascript
// Assuming code from prior section
editor.listen(function() {
  input.value = JSON.stringify(editor)
})
```

This works because editors implement a `toJSON` method that serializes
down blocks into a consistent structure.

### Moving forward

That's it! Actually, not at all. There are a ton of things you can do
with Colonel Kurtz. Many of them are documented in the `./docs`
folder, or used in the example project found at `./example`.

Our documentation still needs improving. Please help us by [filing an
issue on Github if anything is unclear](https://github.com/vigetlabs/colonel-kurtz/issues).
