# Contributing to Colonel Kurtz

1.  [Setup](#setup)
2.  [Running](#running)
3.  [Testing](#testing)
4.  [Publishing to NPM](#publishing-to-npm)
5.  [Conventions](#conventions)

## Setup

Colonel Kurtz is built using tools written for
[nodejs](http://nodejs.org). We recommend installing Node with
[nvm](https://github.com/creationix/nvm).

At the time of writing, Colonel Kurtz is built (and tested) with Node 8.11.0.

Dependencies are managed with an [`npm`](npmjs.org) `package.json`
file. You can install dependencies with:

```bash
npm install
```

## Running

A production build can be built by running:

```bash
make build
```

However most of the time developing with Colonel Kurtz, you will want
to reference the example app:

```bash
yarn start
```

This will host the demo at `http://localhost:8080`. Running this
command takes care of recompiling JavaScript and Sass dependencies for
the example.

## Testing

In a terminal, run:

```bash
yarn test
```

For test coverage:

```bash
yarn run test:cov
open ./coverage/index.html
```

## Publishing to NPM

This project publishes to npm using:

```shell
make release
```

This will run a shell script found at `./bin/bundle`. It is critically
important not to simply run `npm publish`. The release script sets up
an expected structure for hosting on `npm`.

## Conventions

**Master is not safe**, use NPM for the latest stable version.

### Javascript

Run `yarn lint` to check your code style against our eslint
configuration. Anything else is fair game, but roughly:

- No semicolons
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

### Reviews

All changes should be submitted through pull request. Ideally, at
least two :+1:s should be given before a pull request is merge.
