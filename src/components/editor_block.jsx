import Actions      from 'actions/blocks'
import Block        from 'components/block'
import BlockMenu    from 'components/block_menu'
import BlockTypes   from 'stores/block_type_store'
import Blocks       from 'stores/block_store'
import React        from 'react'
import findBy       from 'utils/findBy'

let EditorBlock = React.createClass({

  propTypes: {
    block : React.PropTypes.object.isRequired,
    flux  : React.PropTypes.object.isRequired
  },

  getBlockMenu() {
    let { block, flux } = this.props

    return (<BlockMenu key="block_menu" parent={ block.parent } position={ block } flux={ flux } />)
  },

  render() {
    let { block, flux } = this.props

    let children  = flux.get(Blocks).filter(i => i.parent === block)
    let blockType = findBy(flux.get(BlockTypes), block.type)

    return (
      <div>
        <Block block={ block } blockType={ blockType } onUpdate={ this._onUpdate } onDestroy={ this._onDestroy } />
        { this.getBlockMenu(block) }
      </div>
    )
  },

  _onUpdate(id, content) {
    this.props.flux.send(Actions.update, id, content)
  },

  _onDestroy(id) {
    this.props.flux.send(Actions.destroy, id)
  }

})

export default EditorBlock
