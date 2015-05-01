# Changelog

# 2.14.0

New style updates warranted a minor release, however we also
refactored some internal components related to block type navigation.

### Noticeable Changes

- Improved the appearance and opening animation of the dialog addon
- Improved focus for switch navigation
- Fixed a case where an error would be thrown related to menus of torn
  down blocks.

### Upgrading

The stylesheetfor this release was updated, for a stylesheet specific
to this version, reference the `style` directory that is pulled down
with the `npm` module.

# 2.13.0

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
