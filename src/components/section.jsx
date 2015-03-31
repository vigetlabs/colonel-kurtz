import Actions      from 'actions/blocks'
import Block        from 'components/block'
import BlockMenu    from 'components/block_menu'
import Btn          from 'components/ui/button'
import EditorBlock  from 'components/editor_block'
import React        from 'react'
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
    return (<EditorBlock key={ block.id } { ...this.props } block={ block } />)
  },

  render() {
    let { block, blocks, blockTypes, last } = this.props

    let children = blocks.filter(i => i.parent === block)

    return (
      <div>
        <Block block={ block } blockType={ findBy(blockTypes, block.type) } onDestroy={ this._onDestroy }>
          <BlockMenu blockTypes={ blockTypes } forceOpen={ !children.length } onAdd={ this._onCreate } />
          <div>{ children.map(this.getEditor) }</div>
        </Block>
        <Btn ref="append" className="col-btn-fab" hide={ last && !children.length } onClick={ this._onAppend }>+</Btn>
      </div>
    )
  },

  _onAppend() {
    let { app, block } = this.props
    app.send(Actions.create, block.type, block, null)
  },

  _onCreate(type, position) {
    let { app, block } = this.props
    app.send(Actions.create, type, position, block)
  },

  _onDestroy(id) {
    this.props.app.send(Actions.destroy, id)
  }

})
