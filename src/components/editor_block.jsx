import Block     from 'components/block'
import BlockMenu from 'components/block_menu'
import React     from 'react'
import findBy    from 'utils/findBy'

export default React.createClass({
  propTypes: {
    block      : React.PropTypes.object.isRequired,
    blockTypes : React.PropTypes.array.isRequired
  },

  render() {
    let { block, blockTypes } = this.props

    return (
      <div>
        <Block block={ block } blockType={ findBy(blockTypes, block.type) } />
        <BlockMenu blockTypes={ blockTypes } position={ block } parent={ block.parent } />
      </div>
    )
  }
})
