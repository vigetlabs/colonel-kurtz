# Changelog

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
