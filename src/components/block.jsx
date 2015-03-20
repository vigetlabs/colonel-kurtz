import Pure    from 'pure'
import React   from 'react'
import Toolbar from 'components/toolbar'

let Block = React.createClass({

  propTypes: {
    block     : React.PropTypes.object.isRequired,
    blockType : React.PropTypes.object.isRequired,
    onDestroy : React.PropTypes.func.isRequired,
    onUpdate  : React.PropTypes.func.isRequired
  },

  mixins: [ Pure ],

  render() {
    let { block, blockType, children, onDestroy } = this.props
    let { component:Component } = blockType

    return (
      <Component ref="block" content={ block.content } onChange={ this._onUpdateContent }>
        <Toolbar block={ block } onDestroy={ onDestroy } />
        <div className="col-children">{ children }</div>
      </Component>
    )
  },

  _onUpdateContent(content) {
    this.props.onUpdate(this.props.block.id, content)
  }

})

export default Block
