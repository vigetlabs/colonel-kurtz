# Data Migration

1. [Overview](#overview)
2. [How it works](#how-it-works)
2. [Data migration in the browser](data-migration-in-the-browser)
3. [Data migration on the server](#data-migration-on-the-server)

## Overview

Colonel Kurtz 2.0.0 marked the first change to the structure of its
output. To handle old data, a migration tool has been added.

For future releases, all data is tagged with the version of the editor
with which it was saved. You can view this in the output under the
`system` key:

```json
{
  "system" : { "version" : "2.0.0" },
  "blocks" : []
}
```

## How it works

Colonel Kurtz checks the [semver](http://semver.org/) for the provided
data. If no version is provided, it assumes the data is from release
before versioning was added. **Although semver is in place, ideally
changes the data structure will occur in a major release**.

## Data migration in the browser

**Data will automatically migrate to the latest version on
startup**.

## Data migration on the server

Colonel Kurtz also includes a binary that will perform the same
operations as the browser behavior.

This binary requires [node.js](nodejs.org).

```shell
$(npm bin)/colonel_kurtz oldData
```

`$(npm bin)` returns the project localized bin directory for node
packages. By default, this is under `./node_modules/.bin`. The binary
will update the JSON and provide STDOUT with the modernized
structure.
