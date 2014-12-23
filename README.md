# Colonel Kurtz

A block editor. Still a work in progress; updates will be rather unstable.

[ ![Codeship Status for vigetlabs/colonel-kurtz](https://codeship.com/projects/09586580-5c8a-0132-59ca-1a777663c9d2/status)](https://codeship.com/projects/50884)

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
