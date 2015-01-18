/* @flow */

var Button       = require('./ui/button')
var DestroyBlock = require('../actions/block/destroy')
var React        = require('react')
var Strings      = require('../constants/strings')

var RemoveBlock = React.createClass({

  render(): any {
    return (
      <Button aria-label={ Strings.remove.label } className="col-btn-remove" onClick={ this._onClick }>
        &times;
      </Button>
    )
  },

  _onClick(e: Event): void {
    e.preventDefault();

    if (confirm(Strings.remove.confirm)) {
      DestroyBlock(this.props.block.id)
    }
  }

})

module.exports = RemoveBlock
