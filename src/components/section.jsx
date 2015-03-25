import Actions      from 'actions/blocks'
import Block        from 'components/block'
import BlockMenu    from 'components/block_menu'
import Blocks       from 'stores/block_store'
import React        from 'react'
import findBy       from 'utils/findBy'
import EditorBlock  from 'components/editor_block'

let Section = React.createClass({

  propTypes: {
    block      : React.PropTypes.object.isRequired,
    blocks     : React.PropTypes.array.isRequired,
    blockTypes : React.PropTypes.array.isRequired,
    flux       : React.PropTypes.object.isRequired
  },

  getBlockMenu() {
    let { block, flux } = this.props
    return (<BlockMenu key="menu" parent={ block } position={ 0 } flux={ flux } />)
  },

  getBlock(block) {
    let { flux, blocks, blockTypes } = this.props

    return (<EditorBlock key={ block.id } block={ block } blocks={ blocks } blockTypes={ blockTypes } flux={ flux } />)
  },

  render() {
    let { block, blocks, blockTypes, flux } = this.props

    let children  = blocks.filter(i => i.parent === block)
    let blockType = findBy(blockTypes, block.type)

    return (
      <Block block={ block } blockType={ blockType } onDestroy={ flux.send(Actions.destroy) }>
        { this.getBlockMenu() }
        { children.map(this.getBlock) }
      </Block>
    )
  }

})

export default Section
