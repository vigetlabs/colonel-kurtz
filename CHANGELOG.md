# Changelog

## New Changes

- Upgrade project dependencies (the following is not an exhaustive list)
  - Babel 7
  - ESLint 7
  - Prettier 2.0
  - React/DOM 16.13
  - Rollup 2.8
  - Webpack 4.43
  - Microcosm 12.15

### Upgrading

The main change to be aware of when upgrading to the latest version of Colonel Kurtz is that the editor no longer requires you to call `editor.start()` after calling `new ColonelKurtz({..})` in order to boot the app.

#### Before

```javascript
const editor = new ColonelKurtz({ .. })

editor.start()
```

#### After

```javascript
new ColonelKurtz({ .. })
```

**Note**: you may still want to bind the app instance to a variable if you want to attach additional listeners or perform other setup work.

## 5.2.1

- Fix bug where block creation toggle could get stuck open

## 5.2.0

- Address embed issues where manually typing in HTML was impossible

## 5.1.0

- Generate a unique ID for <Field /> and its associated label
- Content may now be updated by passing a key/value pair to
  `onChange`. See the following section for more info.

### Content may now be updated by passing a key/value pair

We've hit many situations where we need to update a deeply nested key
in CK. This is particularly painful when updating an index of an
array:

```javascript
let tags = this.props.metadata.tags.concat()

tags[1] = 'jellybeans'

this.props.onChange({
  metadata: { ...this.props.content.metadata, tags }
})`
```

Instead, with this release you can provide a key path. This behaves
similarly to [Lodash's set function](https://lodash.com/docs#set):

```
this.props.onChange('title', 'My Dessert Foods')
this.props.onChange('metadata.tags.1', 'jellybeans')
```

By providing a string of `dot` separated values, CK will drill down
into content properties on your behalf. This aims to greatly improve
the ergonomics of updating nested keys.

## 5.0.2

- Fix build issue where Object.assign compiled to `true`

## 5.0.1

- Remove uglify step to avoid unexpected minification errors

## 5.0.0

Upgrade to support React 16.0

### Breaking Changes

Component definitions must now be React class instances. If your
components use the React.createClass syntax, consider moving over to
ES6 classes, or use the `react-create-class` package.

## 4.3.0

- Inline the uid module

## 4.2.1

- Use ref callback pattern. This change removes deprecation warnings in
  the browser console when Colonel Kurtz is used with React 15.6.0.

## 4.2.0

- Add `maxDepth` config option to ColonelKurtz application

## 4.1.0

- Blocks assign default content when mounted. This is technically a
  bug, but the fix impacts content assignment (default values will
  start to show up), so we're releasing it under a minor revision.

## 4.0.0

- Upgraded dependencies
- Removed deprecation warnings for React 15.x
- Added support for React 15.x

## 3.5.1

- Added a style tag to the HTML embed addon to cut default body margins

## 3.5.0

- Added a fallback state for when a block type is not recognized.

## 3.4.0

- Upgrade Microcosm to 9.21.x
- The `<Field />` component is once again controlled. Upgrading
  Microcosm addressed issues with using a controlled input inside
  of this add-on.
- Fix html embed styles

### Upgrading

If you are using the `<Field />` component, verify that it continues to
work as expected. We moved away from controlled inputs in a prior
release when we were unable to determine why cursor position would
erratically move to the end of an input when it changed. This was due
to a way older versions of Microcosm batched state changes
together. This is no longer an issue, so we moved back to the original
controlled strategy.

If you would like to keep the old behavior, instead of passing a
`value` property into the `<Field />` component, send in
`defaultValue`. This is the method exposed by React for uncontrolled
inputs.

For more information on controlled inputs, see the React
documentation:

https://facebook.github.io/react/docs/forms.html#controlled-components

## 3.3.0

- Added `html-embed` add-on. This component may be used to include
  HTML and accompanying scripts within Colonel Kurtz.

## 3.2.0

- The menu item component is now available as the third argument of
  onClick handlers for custom menu items.

## 3.1.1

- Fixed style issue in Firefox where menu items were truncated

## 3.1.0

- Added a `clientOnly` property to blocks. This is a boolean property
  indicating if the block was created by the user during the current
  editing session (as opposed to being present when the editor starts).

## 3.0.0

- **Important Update**: This update makes breaking changes to support
  React 0.14. colonel-kurtz now takes advantage of
  `react-addons-css-transition-group` and utilizes `react-dom` for
  rendering.

## 2.23.1

- Address bug where default content block information was not
  respected.

## 2.23.0

### Noticeable Changes

- The BlockType creator menu now properly displays focus state
- BlockTypes given a `group` property will display as a dropdown in
  the BlockType creator menu.

### Upgrading

All changes are non-breaking. For those not including the Colonel
Kurtz stylesheet via `node_modules`, you will need to update your
stylesheet in order to benefit from the new focus state on the
BlockType creator menu

BlockTypes can be grouped! To do this, add a `group` property to your
block type like so:

```javascript
let blockTypes = [
  {
    id: 'youtube',
    group: 'Embedded'
    // other props
  },
  {
    id: 'twitter',
    group: 'Embedded'
    // other props
  },
  {
    id: 'facebook',
    group: 'Embedded'
    // other props
  }
]
```

## 2.22.0

### Noticeable Changes

- Added a `hint` property the `<Field />`
- Added `uid` dependency to generate unique ids for `<Field />` hints
- Updated some development dependencies
- The YouTube addon will now accept a URL in addition to ID. The ID of
  the YouTube video will be extracted and saved (no breaking change)
- Updated the labels and hints for the YouTube addon to make it clear
  that a URL may also be pasted into the field.
- Added hint property to `<Embeddable />` to allow hint text on its
  `<Field />` component
- Added padding to right of `<Field />` label to handle very long
  labels colliding with menu button.

### Upgrading

There are small style updates to `<Field />` those not pulling in the
style sheet from node_modules should update theirs accordingly.

## 2.21.0

- The `<Field />` component is no longer a [controlled input](https://facebook.github.io/react/docs/forms.html#controlled-components)
- The `<Field />` component label now wraps its input

## 2.20.0

- Added Embedded common component addon. The YouTube addon now uses it.

## 2.19.0

- BlockTypes are provided a default component definition that only renders children. This is to provide a standard default for block types that are containers for other blocks.
- This project no longer compiles in Babel loose mode.

## 2.18.0

### Noticeable Changes

- Focus places upon the navigation element instead of the first button
  of a block creator menu when opened.
- Improved focus state of block creator menu buttons.
- Added `col-block-editor` and `col-block-children` css hooks
- `Field` component can take an `element` option (for text areas, defaults to `input`)
- Added `allow` property to configuration options to only allow specific blocks
- The Youtube and Image addons strip white space when checking to open
- Upgraded Microcosm to 8.1.0
- Added `root` property to blockTypes. When set to false, it will prevent it from displaying in the default block menu
- Added `maxChildren` property to Colonel instances and BlockTypes to limit the number of children
- Returned "Move up" and "Move down" phrasing in menu items.

## 2.17.0

### Noticeable Changes

- The content object of a block is always defined as an object.

## 2.16.2

### Internal Changes

- Bump react-ink to 0.4

## 2.16.1

### Internal Changes

- Lock down a few dependencies to prevent installation of React 0.14

## 2.16.0

### Noticeable Changes

- Slightly increased padding of switch navigation buttons. This is
  present when block type labels exceed the min-width of those buttons
- Tweaked vertical alignment of secondary add block buttons
- Increased contrast of button focus background for block menu
- Improve animation for menus, add closing animation.
- "Move Up" and "Move Down" have been renamed to "Move Before" and
  "Move After". This is in anticipation for block types that display
  children horizontally.
- `Dialog` addon accepts `title` and `headingComponent` props for
  customizable headings.
- `Dialog` y-axis overflow scrolls when necessary.

### Upgrading

This releases an update to the stylesheet. If you are not including it
from `node_modules`, be sure to pull down the latest files from `./style`

# 2.15.0

### Noticeable Changes

- The menu to add new blocks will now collapse when the escape key is
  pressed.
- Refactored switch navigation to be smarter about secondary
  buttons.
- Improved animation for switches. Refactored Switch css

### Upgrading

This releases an update to the stylesheet. If you are not including it
from `node_modules`, be sure to pull down the latest files from `./style`

## 2.14.0

New style updates warranted a minor release, however we also
refactored some internal components related to block type navigation.

### Noticeable Changes

- Improved the appearance and opening animation of the dialog addon
- Improved focus for switch navigation
- Fixed a case where an error would be thrown related to menus of torn
  down blocks.

### Upgrading

The stylesheet for this release was updated, for a stylesheet specific
to this version, reference the `style` directory that is pulled down
with the `npm` module.

## 2.13.0

### Breaking changes

- Custom menu items are no longer defined in `statics`. Instead, they
  are returned from a `getMenuItems` method on the component itself.
- The component lifecycle method `menuWillSelect` has been
  removed. For the purposes it was required for, `getMenuItems` is sufficient

### Upgrading

- For those using custom menu items, see the updated `menu.md` doc for
  the updated API.

## 2.12.2

- `react-ink` was missing in the build. Originally it was compiled
  into the main payload, this changed when we updated the build
  process. `react-ink` is now a standard dependency.

## 2.12.1

- Publishing to NPM occurs by pushing the `dist` folder. Instead, the root folder was published

## 2.12.0

### Breaking changes

- Addons are now available directly under
  `colonel-kurtz/addons`, their `colonel-kurtz/build` counterparts
  have been removed. This is due to a change in the build process to
  help expose components for use when building new UI.

### Noticeable Changes

- New menu items may now be added on an individual block type
  level. For more information, see `./docs/menus.md`
- Style for addons has been moved to `./style/addons` so that it is
  easier to pull down all styles at once or reference the directory in
  `node_modules`.

### Upgrading

This release has a breaking change to improve the ease of including
React components defined by Colonel Kurtz when building new block
types. If you are including addons, the following change is necessary:

In the case of the YouTube component addon, in the previous release it
can be included using:

`let YouTube = require('colonel-kurtz/build/addons/youtube')`

This has now become:

`let YouTube = require('colonel-kurtz/addons/youtube')`

## 2.11.0

### Noticeable Changes

- Youtube and Image components can accept children. This is intended
  to better support additional fields.

## 2.10.0

### Noticeable Changes

- Colonel Kurtz will now inherit theme colors from upcoming
  active_material gem. Beyond exposing variables, no visual
  differences should be observed.

### Bug fixes

- Fixed some style inconsistencies in Firefox

## 2.9.0

### Noticeable Changes

- Colonel's `blocks` option can accept an input or textarea

## 2.8.0

As of this release, we will break out changes into those noticeable to
users and those internal to Colonel itself.

### Noticeable changes

- Menu items will always display for moving blocks. If a block can not
  be moved further, the item will be disabled.

### Internal changes

- Change internal moving method to eliminate edge cases and fragility
- Increase test coverage

## 2.7.0

- Add experimental "Section" block type addon

## 2.6.0

- Reworked build process to speedup setup time

## 2.5.2

- Externalize react-focus-trap so it gets patches

## 2.5.1

- Upgrade react focus trap for better focus management of menus

## 2.5.0

- Upgraded Microcosm to 7.0.0.
- Renamed Toolbar to Menu, be sure to upgrade CSS with this change.
- Refactored some internals, though nothing should surface itself

## 2.4.0

- Set up more sharing between Youtube and Image addons
- Improve animations of Image and Youtube UI

## 2.3.0

- Refined YouTube UI

## 2.2.0

- Added a section addon
- Improved focus state of buttons

## 2.1.1

- Internal updates. We make better use of `react-focus-trap` and
  resolve some testing issues

## 2.1.0

- Menus will no longer automatically close, this is to improve the
  experience of keyboard navigation

## 2.0.1

- Fixed main entry point

## 2.0.0

- Each Colonel Kurtz is now an isolated instance with its own state
- Refactored internals to achieve higher test coverage
- Compliance with React 0.13.0
- Updated UI to better support nested blocks
- Added block menus (instead of just a remove button)
- Colonel Kurtz is now a layer on top of
  [Microcosm](https://github.com/vigetlabs/microcosm/). It now
  benefits from the features provided by this system.
- Added a plugin system which will run before Colonel Kurtz starts

### Breaking changes

- `addCallback` is now `listen`
- `removeCallback` is now `ignore`
- `simulateChange` is now `emit`
- Block types must provided within the `blockTypes` key when instantiating Colonel Kurtz
- `render` is now `start`. `start` comes from Microcosm and will run
  through all configured plugins and render the app.
