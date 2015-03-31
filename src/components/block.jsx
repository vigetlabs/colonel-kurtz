import React      from 'react'
import Toolbar    from 'components/toolbar'
import classNames from 'classnames'

let Block = React.createClass({

  propTypes: {
    block     : React.PropTypes.object.isRequired,
    blockType : React.PropTypes.object.isRequired,
    onDestroy : React.PropTypes.func,
    onUpdate  : React.PropTypes.func,
    onMove    : React.PropTypes.func
  },

  render() {
    let { block, blockType, children, onDestroy, onMove } = this.props
    let { component:Component } = blockType

    return (
      <div className={ classNames('col-block', `col-block-${ block.type }`) }>
        <Component ref="block" content={ block.content } onChange={ this._onUpdate }>
          { children }
        </Component>
        <Toolbar block={ block } onDestroy={ onDestroy } onMove={ onMove }/>
      </div>
    )
  },

  _onUpdate(content) {
    this.props.onUpdate(this.props.block.id, content)
  }

})

export default Block
