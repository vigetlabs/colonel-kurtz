/**
 * Image Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

var Editor = require('./editor')
var React  = require('react')

require('./style')

var Image = {

  defaultContent() {
    return { src: '', caption: '', attribution: '' }
  },

  render() {
    return <Editor onChange={ this.setContent } { ...this.state.content } />
  }

}

module.exports = Image
