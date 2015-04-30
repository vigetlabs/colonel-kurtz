let siblingsOf = require('../utils/siblingsOf')
let { destroy, move } = require('../actions/blocks')

module.exports = [
  {
    id : 'moveUp',
    label : 'Move Up',
    onClick(app, block) {
      app.push(move, block, -1)
    },
    isDisabled(app, block) {
      return siblingsOf(app.get('blocks'), block)[0] === block
    }
  },
  {
    id : 'moveDown',
    label : 'Move Down',
    onClick(app, block) {
      app.push(move, block, 1)
    },
    isDisabled(app, block) {
      return siblingsOf(app.get('blocks'), block).pop() === block
    }
  },
  {
    id : 'destroy',
    label : 'Remove',
    onClick(app, block) {
      app.push(destroy, block.id)
    }
  }
]
