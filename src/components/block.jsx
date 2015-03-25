import React   from 'react'
import Toolbar from 'components/toolbar'

let Block = React.createClass({

  propTypes: {
    block     : React.PropTypes.object.isRequired,
    blockType : React.PropTypes.object.isRequired,
    onDestroy : React.PropTypes.func,
    onUpdate  : React.PropTypes.func
  },

  render() {
    let { block, blockType, children, onDestroy } = this.props
    let { component:Component } = blockType

    return (
      <div className={`col-block col-block-${ block.type }`}>
        <Component ref="block" content={ block.content } onChange={ this._onUpdate }>
          { children }
        </Component>
        <Toolbar block={ block } onDestroy={ onDestroy } />
      </div>
    )
  },

  _onUpdate(content) {
    this.props.onUpdate(this.props.block.id, content)
  }

})

export default Block
