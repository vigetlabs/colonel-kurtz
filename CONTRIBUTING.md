# Contributing to Colonel Kurtz

1. [Setup](#setup)
2. [Running](#running)
3. [Testing](#testing)
4. [Conventions](#conventions)

## Setup

Colonel Kurtz is built using tools written for
[nodejs](http://nodejs.org). We recommend installing Node with
[nvm](https://github.com/creationix/nvm).

At the time of writing, Colonel Kurtz is built (and tested) with Node
0.10.0. It will remain at that version until a higher level of build tool
support for 0.12.0 can be obtained.

Dependencies are managed with an [`npm`](npmjs.org) `package.json`
file. You can install dependencies with:

```bash
npm install
```

## Running

A production build can be built by running:

```bash
npm run prepublish
```

However most of the time developing with Colonel Kurtz, you will want
to reference the example app:

```bash
npm start
```

This will host the demo at `http://localhost:8080`.

## Testing

Colonel Kurtz uses [Karma](karma-runner.github.io). You can run tests
with:

```bash
npm test
```

For faster builds, consider removing code coverage:

```bash
NO_COVERAGE=true npm test
```

## Conventions

**Master is not safe**, use NPM for the latest stable version.

### Javascript

Colonel Kurtz uses ES6 Javascript (compiled using
[Babel](babeljs.io)). As for style, shoot for:

- No semicolons
- Commas last,
- 2 spaces for indentation (no tabs)
- Prefer ' over "
- 80 character line length

### Style (Sass)

We use the `scss` syntax for Sass. We also have a couple of opinions:

- Multiple selectors are placed on multiple lines
- Alphabetize rules
- Limit nesting
- All variables must use the `!default` flag
- All variables must be prefixed with `$col`
- All selectors, as possible, must be prefixed with `.col`

### Testing

Additionally, we aspire for 100% code coverage. However 100% code
coverage is not a foolproof indicator of good testing. Tests that
cover as much surface area as possible (for the sake of coverage)
should be avoided. This is a much softer measure than a style guide,
and will fall to code review for enforcement.

### Reviews

All changes should be submitted through pull request. Ideally, at
least two :+1:s should be given before a pull request is merge.
