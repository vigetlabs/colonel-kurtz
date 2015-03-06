/* @flow */

var Button       = require('./ui/button')
var DestroyBlock = require('../actions/block/destroy')
var Strings      = require('constants/strings')
var React        = require('react')
var closeIcon    = require('icons/close')

var RemoveBlock = React.createClass({

  render(): any {
    return (
      <Button aria-label={ Strings.remove } className="col-btn-remove" onClick={ this._onClick }>
        <span dangerouslySetInnerHTML={{ __html: `${ closeIcon }` }} />
      </Button>
    )
  },

  _onClick(e: Event): void {
    e.preventDefault();
    DestroyBlock(this.props.block.id)
  }

})

module.exports = RemoveBlock
