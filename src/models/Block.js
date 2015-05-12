let uid = require('../utils/uid')

class Block {

  constructor(params) {
    this.id      = uid()
    this.content = params.content || {}
    this.parent  = params.parent
    this.type    = params.type
  }

  valueOf() {
    return this.id
  }

}

module.exports = Block
