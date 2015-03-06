/* @flow */

var React       = require('react')
var RemoveBlock = require('components/remove_block')

var Toolbar = React.createClass({

  render(): any {
    return (
      <div className="col-toolbar">
        <RemoveBlock block={ this.props.block } />
      </div>
    )
  }

})

module.exports = Toolbar
