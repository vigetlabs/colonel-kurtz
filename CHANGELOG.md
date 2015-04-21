# Changelog

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
