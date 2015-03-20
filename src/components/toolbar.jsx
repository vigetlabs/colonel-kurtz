import React       from 'react'
import RemoveBlock from 'components/remove_block'

let Toolbar = React.createClass({

  propTypes: {
    block     : React.PropTypes.object.isRequired,
    onDestroy : React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="col-toolbar">
        <RemoveBlock block={ this.props.block } onDestroy={ this.props.onDestroy }/>
      </div>
    )
  }

})

export default Toolbar
