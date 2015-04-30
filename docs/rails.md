# Rails Integration

1. [Overview](#overview)
2. [Installing Node](#installing-node)
3. [Setting up Browserify](#setting-up-browserify)
4. [Adding Colonel Kurtz as a dependency](#adding-colonel-kurtz-as-a-dependency)
5. [Including Colonel Kurtz styles](#including-colonel-kurtz-styles)

## Overview

Rails integration with Colonel Kurtz presents a few
challenges. Colonel Kurtz is published on [`npm`](http://npmjs.com/)
and new block types are described as React components. Rails needs to
be taught how to integrate with [`npm`](http://npmjs.com/) and how to
parse [JSX for React](https://facebook.github.io/react/docs/jsx-in-depth.html).

## Installing Node

Most of the tools described in this document rely on
[NodeJS](https://nodejs.org). Node will not be run as a web
server. The community has built a number of fantastic tools using Node
that we will take advantage of.

Our recommended way to install Node is to do it through
[Node Version Manager](https://github.com/creationix/nvm#usage). Additionally,
you can create a `.nvmrc` file to lock down what version of Node is
used for a project (also described in the readme of NVM).

## Setting up Browserify

[browserify](http://browserify.org/) is a JavaScript build tool for
compiling and transforming JavaScript. It allows developers to include
dependencies using the CommonJS module system. We have used it on
several Rails projects because of the relatively easy integration
using
[`browserify-rails`](https://github.com/browserify-rails/browserify-rails).

Browserify is going to do two things for us:

1. Make it easier to include Colonel Kurtz
2. Transform React's JSX syntax into vanilla JavaScript

After following the installation process described in the readme of
[`browserify-rails`](https://github.com/browserify-rails/browserify-rails),
we need to create a `package.json` file to describe dependencies that
should be pulled down from [`npm`](https://npmjs.com).

At the root of your project, you can create a new `package.json` with:

```
npm init
```

This will boot a wizard that will ask you for information about the
project. It is hard to mess this up, and if there does happen to be a
problem, `npm` will warn you of the issue as you run some of the
commands described later in this document.

As a last step, if you have not installed `browserify` or
`browserify-incremental`, do that now:

```shell
npm install --save browserify
npm install --save browserify-incremental`
```

This will pull down each module from `npm` and save a record of the
dependency in `package.json`. For the future, when a developer
executes `npm install`, it will pull down these same, versioned, dependencies.

## Adding Colonel Kurtz as a dependency

Similarly to `browserify` in the previous step:

```shell
npm install --save colonel-kurtz
```

Thats it! Additional information about configuring Colonel Kurtz is
documented in `./colonel.md`.

## Including Colonel Kurtz styles

The `npm` package for Colonel Kurtz also includes a Sass stylesheet. As
an optional step for those using Sass, the `node_modules` folder
(where NPM places dependencies) can be added to the known Rails asset
paths in order to expose these styles.

In `config/application.rb` add the following entry in your config block:

```ruby
  config.assets.paths << "#{ config.root }/node_modules"
```

Finally, in your stylesheet:

```
@import "colonel-kurtz/style/colonel";
```
