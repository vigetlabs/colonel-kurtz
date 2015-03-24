import Actions      from 'actions/blocks'
import Block        from 'components/block'
import BlockMenu    from 'components/block_menu'
import BlockTypes   from 'stores/block_type_store'
import Blocks       from 'stores/block_store'
import React        from 'react'

let EditorBlock = React.createClass({

  propTypes: {
    block : React.PropTypes.object.isRequired,
    flux  : React.PropTypes.object.isRequired
  },

  getBlock(block): any {
    return (<EditorBlock key={ block.id } block={ block } flux={ this.props.flux } />)
  },

  getBlockMenu(block) {
    let blockTypes = this.props.flux.get(BlockTypes).filter(i => !i.private)

    return !block.parent ? (
      <BlockMenu key="block_menu"
                 block={ block }
                 flux={ this.props.flux }
                 blockTypes={ blockTypes}
                 onAdd={ this.props.flux.send(Actions.create) } />
    ) : null
  },

  render(): any {
    let { block, flux } = this.props

    let children  = flux.get(Blocks).filter(i => i.parent === block)
    let blockType = flux.get(BlockTypes).filter(i => i.id === block.type)[0]

    return (
      <Block block={ block } blockType={ blockType } onUpdate={ flux.send(Actions.update) } onDestroy={ flux.send(Actions.destroy) }>
        { children.map(this.getBlock) }
        { this.getBlockMenu(block) }
      </Block>
    )
  }

})

export default EditorBlock
