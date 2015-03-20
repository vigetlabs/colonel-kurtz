import Block     from 'components/block'
import BlockMenu from 'components/block_menu'
import React     from 'react'

let EditorBlock = React.createClass({

  propTypes: {
    block      : React.PropTypes.object.isRequired,
    blockTypes : React.PropTypes.object.isRequired,
    flux       : React.PropTypes.object.isRequired
  },

  getBlock(block): any {
    let { blockTypes, flux } = this.props

    return (<EditorBlock key={ block.id } flux={ flux } block={ block } blockTypes={ blockTypes } />)
  },

  render(): any {
    let { block, blockTypes } = this.props
    let { update, destroy } = this.props.flux.actions.blocks

    return (
      <Block block={ block } blockType={ blockTypes.find(block.type) } onUpdate={ update } onDestroy={ destroy }>
        { this.props.flux.stores.blocks.childrenFor(block).map(this.getBlock) }
      </Block>
    )
  }
})

export default EditorBlock
