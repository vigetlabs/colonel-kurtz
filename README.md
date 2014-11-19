# Colonel Kurtz

A block editor

## Use

Include the compiled library. (This is the file located at build/index.js)

```html
<script src="/assets/js/colonel-kurtz.js"></script>
```

The library exposes the `ColonelKurtz` class as a global variable. Use it to instantiate an editor. Then tell it to render.

```js
var element = document.getElementById("colonel-kurtz-container");
var editor = new ColonelKurtz(element);
editor.render()
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
