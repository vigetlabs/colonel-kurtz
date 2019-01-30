const KEY_DELIMETER = '.'

function isBlank(value) {
  return value === '' || value === null || value === undefined
}

function isObject(target) {
  return !(!target || typeof target !== 'object')
}

function copyOver(next, obj) {
  for (var key in obj) {
    next[key] = obj[key]
  }

  return next
}

export function castPath(value) {
  if (Array.isArray(value)) {
    return value
  } else if (isBlank(value)) {
    return []
  }

  return typeof value === 'string' ? value.trim().split(KEY_DELIMETER) : [value]
}

export function assign(subject, ...values) {
  return values.reduce(copyOver, subject)
}

/**
 * Shallow copy an object
 */
export function clone(target) {
  if (Array.isArray(target)) {
    return target.slice(0)
  } else if (isObject(target) === false) {
    return {}
  }

  let copy = {}

  for (var key in target) {
    copy[key] = target[key]
  }

  return copy
}

/**
 * Retrieve a value from an object. If no key is provided, just return
 * the object.
 */
export function get(object, keyPath, fallback) {
  let path = castPath(keyPath)
  let value = object

  for (var i = 0, len = path.length; i < len; i++) {
    if (value == null) {
      break
    }

    value = value[path[i]]
  }

  if (value === undefined || value === null) {
    return arguments.length <= 2 ? value : fallback
  }

  return value
}

/**
 * Non-destructively assign a value to a provided object at a given key. If the
 * value is the same, don't do anything. Otherwise return a new object.
 */
export function set(object, key, value) {
  // Ensure we're working with a key path, like: ['a', 'b', 'c']
  let path = castPath(key)

  let len = path.length

  if (len <= 0) {
    return value
  }

  if (get(object, path) === value) {
    return object
  }

  let root = clone(object)
  let node = root

  // For each key in the path...
  for (var i = 0; i < len; i++) {
    let key = path[i]
    let next = value

    // Are we at the end?
    if (i < len - 1) {
      // No: Check to see if the key is already assigned,
      if (key in node) {
        // If yes, clone that value
        next = clone(node[key])
      } else {
        // Otherwise assign an object so that we can keep drilling down
        next = {}
      }
    }

    // Assign the value, then continue on to the next iteration of the loop
    // using the next step down
    node[key] = next
    node = node[key]
  }

  return root
}
