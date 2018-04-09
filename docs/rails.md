# Rails Integration

We use Colonel Kurtz on most of our Rails CMS work. This guide
contains everything you need to know to setup Colonel Kurtz on a Rails
project:

1.  [Requirements](#requirements)
2.  [Adding Colonel Kurtz as a dependency](#adding-colonel-kurtz-as-a-dependency)
3.  [Including Colonel Kurtz styles](#including-colonel-kurtz-styles)
4.  [Integrating with Active Admin](#integrating-with-active-admin)

## Requirements

1.  [NodeJS](https://nodejs.org/en/); preferrably version 8.11.0 (LTS) or higher
2.  [Webpacker](https://github.com/rails/webpacker)
3.  [Webpacker React Integration](https://github.com/rails/webpacker#react)

### NodeJS

There are a few ways to manage NodeJS versions between projects. We
like [nvm](https://github.com/creationix/nvm) and [asdf](https://github.com/asdf-vm/asdf). If using `nvm`, there is a `.nvmrc` file
in each app directory that enforces the desired node version.

### Webpacker

[Webpacker](https://github.com/rails/webpacker) is a Ruby gem supported by the Rails team for
integrating [Webpack](https://webpack.js.org/) into Rails projects.

### Webpacker React Integration

Colonel Kurtz uses [React](http://reactjs.com/) to render the editor. *React is not
required to render the JSON content Colonel Kurtz generates*, but is
necessary to content using the Colonel Kurtz editor.

Assuming your Rails app is configured with Webpacker [follow the
installation guide for React](https://github.com/rails/webpacker#react).

## Adding Colonel Kurtz as a dependency

Colonel Kurtz is available via [npm](https://www.npmjs.com/package/colonel-kurtz), a package manager for
JavaScript. If you have already installed [Webpacker](https://github.com/rails/webpacker), you should
already have everything you need to move forward at this point.

```shell
yarn add colonel-kurtz
```

_Note: webpacker comes with support for [yarn](https://yarnpkg.com/en/), an alternative to
the npm CLI. We prefer it over npm, however it is not required for
Colonel Kurtz integration_

Thats it! Additional information about configuring Colonel Kurtz is
documented in [`./colonel.md`](https://github.com/vigetlabs/colonel-kurtz/blob/ef/update-docs/docs/colonel.md).

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
@import "colonel-kurtz/style/addons/common";
```

## Integrating with Active Admin

If your project is using ActiveAdmin, you'll need to do a couple more
things to finish the integration.

1.  You'll need to set up a new Formtastic input type. You can add the
    contents of [this gist](https://gist.github.com/efatsi/aad9e67df4da20ded20dcf22e4a5279f) to a new file called
    `app/admin/inputs/colonel_kurtz_input.rb`.

2.  You'll then need to configure ColonelKurtz and have it load on the
    inputs that it's set to. We suggest adding the contents of [this
    gist](https://gist.github.com/efatsi/b878f9a1fc5799c1aa313fe181d58dc9) to a new file called
    `app/assets/javascripts/admin/editor.js`, and add the appropriate
    require line in active_admin.js:

```js
//= require admin/editor`
```

3.  You'll notice that there are a few files required in
    editor.js. `blockTypes` contains a definable list of available
    ColonelKurtz blocks, and `persist` is necessary for exporting the
    output of the ColonelKurtz editor into a form field for
    submission. You should create the following files to fill these
    roles:

* `app/assets/javascripts/admin/colonel/blockTypes/index.js`: [this gist](https://gist.github.com/efatsi/18e60b2e22ceca1f10a8d59ee978049b)
* `app/assets/javascripts/admin/colonel/plugins/persist.js`: [this gist](https://gist.github.com/efatsi/c01c3e730d829250f13cb0380795cb6b)

4.  With your new input defined and the proper javascript in place,
    you can set any text field to be a Colonel Kurtz editable field by
    specifying it as such:

```ruby
f.input :content, as: :colonel_kurtz
```
