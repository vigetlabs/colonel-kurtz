/* @flow */

var React       = require('react')
var RemoveBlock = require('components/remove_block')

var Toolbar = React.createClass({

  propTypes: {
    block : React.PropTypes.object.isRequired
  },

  render(): any {
    return (
      <div className="col-toolbar">
        <RemoveBlock block={ this.props.block } onDestroy={ this.props.onDestroy }/>
      </div>
    )
  }

})

module.exports = Toolbar
