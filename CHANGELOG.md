# Changelog

## 2.0.0

- Each Colonel Kurtz is now an isolated instance with its own state
- Refactored internals to achieve 100% test coverage
- Compliance with React 0.13.0
- Added the concept of sections. A section is a special block type
  intended to be the parent of other blocks.
- Updated UI to support sections.
- Added data migration strategy
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
