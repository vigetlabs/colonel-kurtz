# Colonel Kurtz

A block editor. Still a work in progress; updates will be rather unstable.

[![Build Status](https://travis-ci.org/vigetlabs/colonel-kurtz.png?branch=master)](https://travis-ci.org/vigetlabs/colonel-kurtz)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/colonel-kurtz/badge.png?branch=master)](https://coveralls.io/r/vigetlabs/colonel-kurtz?branch=master)

## Use

```javascript
var ColonelKurtz = require('colonel-kurtz');

var editor = new ColonelKurtz({
  el   : input,
  seed : JSON.parse(input.value)
});
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
