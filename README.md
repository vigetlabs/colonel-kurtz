# Colonel Kurtz

A block editor. Still a work in progress; updates will be rather unstable.

---

[![Build Status](https://travis-ci.org/vigetlabs/colonel-kurtz.png?branch=master)](https://travis-ci.org/vigetlabs/colonel-kurtz)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/colonel-kurtz/badge.svg)](https://coveralls.io/r/vigetlabs/colonel-kurtz)

---

## Use

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

### Type Checking (Optional)

```bash
flow start
flow
```
