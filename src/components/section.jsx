import Actions      from 'actions/blocks'
import Block        from 'components/block'
import BlockMenu    from 'components/block_menu'
import Blocks       from 'stores/block_store'
import Button       from 'components/ui/button'
import EditorBlock  from 'components/editor_block'
import React        from 'react'
import findBy       from 'utils/findBy'

let Section = React.createClass({

  propTypes: {
    block      : React.PropTypes.object.isRequired,
    blocks     : React.PropTypes.array.isRequired,
    blockTypes : React.PropTypes.array.isRequired,
    flux       : React.PropTypes.object.isRequired
  },

  getBlock(block) {
    let { flux, blocks, blockTypes } = this.props

    return (<EditorBlock key={ block.id } block={ block } blocks={ blocks } blockTypes={ blockTypes } flux={ flux } />)
  },

  render() {
    let { block, blocks, blockTypes, flux, last } = this.props

    let children  = blocks.filter(i => i.parent === block)
    let blockType = findBy(blockTypes, block.type)
    let canAppend = children.length || !last

    return (
      <div>
        <Block block={ block } blockType={ blockType } onDestroy={ flux.send(Actions.destroy) }>
          <BlockMenu parent={ block } position={ 0 } flux={ flux } forceOpen={ !children.length } />
          <div>{ children.map(this.getBlock) }</div>
        </Block>
        { canAppend && <Button className="col-btn-fab" onClick={ this._onAdd }>+</Button> }
      </div>
    )
  },

  _onAdd() {
    let { block, flux } = this.props

    flux.send(Actions.create, block.type, block, null)
  }

})

export default Section
