import Actions      from 'actions/blocks'
import Block        from 'components/block'
import BlockMenu    from 'components/block_menu'
import Btn          from 'components/ui/button'
import EditorBlock  from 'components/editor_block'
import React        from 'react'
import childrenOf   from 'utils/childrenOf'
import findBy       from 'utils/findBy'

export default React.createClass({
  propTypes: {
    app        : React.PropTypes.object.isRequired,
    block      : React.PropTypes.object.isRequired,
    blocks     : React.PropTypes.array.isRequired,
    blockTypes : React.PropTypes.array.isRequired,
    last       : React.PropTypes.bool
  },

  getEditor(block) {
    let { app, blockTypes } = this.props

    return (
      <EditorBlock key={ block.id } app={ app } block={ block } blockTypes={ blockTypes }/>
    )
  },

  render() {
    let { app, block, blocks, blockTypes, last } = this.props

    let children   = childrenOf(block, blocks)
    let noChildren = !children.length
    let shouldHide = last && noChildren

    return (
      <div>
        <Block app={ app } block={ block } blockType={ findBy(blockTypes, block.type) }>
          <BlockMenu key="menu" app={ app } parent={ block } blockTypes={ blockTypes } forceOpen={ noChildren } />
          { children.map(this.getEditor) }
        </Block>
        <Btn ref="append" className="col-btn-fab" hide={ shouldHide } onClick={ this._onAppend }>+</Btn>
      </div>
    )
  },

  _onAppend() {
    this.props.app.send(Actions.append, 'section')
  }

})
