# Colonel Kurtz

A block based content editor (more after the hop). Still a work in progress; updates will be rather unstable.

---

[![Build Status](https://travis-ci.org/vigetlabs/colonel-kurtz.png?branch=master)](https://travis-ci.org/vigetlabs/colonel-kurtz)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/colonel-kurtz/badge.svg)](https://coveralls.io/r/vigetlabs/colonel-kurtz)

---

## Overview

Colonel Kurtz is a hierarchal content editor. It breaks up
pages into sections of blocks. Each block has a given type, which
defines the presentation of its content. A page may look like this:

```
section
 |-> text
 |-> image
 |-> text
section
 |-> video
 |-> text
```

Colonel Kurtz saves this information in the JSON format, with which
you can do whatever you want.

```javascript
var ColonelKurtz = require('colonel-kurtz');

var editor = new ColonelKurtz({
  el   : input,
  seed : JSON.parse(input.value)
});
```

## Migrating Data

Colonel Kurtz will run migrations on data automatically. However
client data is only one piece of this. Colonel Kurtz provides a binary
for migrating data from one form to the next to help with backend
services:

```bash
$(npm bin)/colonel_kurtz oldJson
```

## Contributing

### Setup

```bash
npm install -d
npm start
```
