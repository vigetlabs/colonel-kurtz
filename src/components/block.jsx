import Actions      from 'actions/blocks'
import React        from 'react'
import Toolbar      from 'components/toolbar'
import classNames   from 'classnames'
import {Downstream} from 'microcosm'

export default React.createClass({
  mixins: [ Downstream ],

  propTypes: {
    block     : React.PropTypes.object.isRequired,
    blockType : React.PropTypes.object.isRequired,
  },

  render() {
    let { block, blockType, children } = this.props
    let { component:Component } = blockType

    return (
      <div className={ classNames('col-block', `col-block-${ block.type }`) }>
        <Component ref="block" content={ block.content } onChange={ this._onChange }>
          { children }
        </Component>
        <Toolbar block={ block } />
      </div>
    )
  },

  _onChange(content) {
    this.send(Actions.update, this.props.block, content)
  }

})
