/* @flow */

var BlockActions = require('../actions/block_actions')
var Button       = require('./ui/button')
var React        = require('react')
var Strings      = require('../constants/strings')
var Types        = React.PropTypes

var RemoveBlock = React.createClass({

  propTypes: {
    blockId           : Types.number.isRequired,
    parentBlockListId : Types.number.isRequired
  },

  render(): any {
    return (
      <Button aria-label={ Strings.remove.label } className="col-btn-remove" onClick={ this._onClick }>
        &times;
      </Button>
    )
  },

  _onClick(e) {
    var answer = confirm(Strings.remove.confirm)
    var { blockId, parentBlockListId } = this.props

    e.preventDefault();

    if (answer) {
      BlockActions.destroy({ blockId, parentBlockListId })
    }
  }

})

module.exports = RemoveBlock
