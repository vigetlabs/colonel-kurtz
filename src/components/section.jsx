import Actions      from 'actions/blocks'
import Block        from 'components/block'
import BlockMenu    from 'components/block_menu'
import BlockStore   from 'stores/block_store'
import BlockTypes   from 'stores/block_type_store'
import Blocks       from 'stores/block_store'
import Button       from 'components/ui/button'
import EditorBlock  from 'components/editor_block'
import React        from 'react'
import findBy       from 'utils/findBy'

let Section = React.createClass({

  propTypes: {
    block : React.PropTypes.object.isRequired,
    flux  : React.PropTypes.object.isRequired,
    last  : React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      last: false
    }
  },

  getBlock(block) {
    let { flux } = this.props

    return (<EditorBlock key={ block.id } block={ block } flux={ flux } />)
  },

  render() {
    let { block,  flux, last } = this.props

    let children  = flux.get(BlockStore).filter(i => i.parent === block)
    let blockType = findBy(flux.get(BlockTypes), block.type)
    let canAppend = children.length || !last

    return (
      <div>
        <Block block={ block } blockType={ blockType } onDestroy={ flux.prepare(Actions.destroy) }>
          <BlockMenu parent={ block } position={ 0 } flux={ flux } forceOpen={ !children.length } />
          <div>{ children.map(this.getBlock) }</div>
        </Block>
        { canAppend && <Button ref="append" className="col-btn-fab" onClick={ this._onAdd }>+</Button> }
      </div>
    )
  },

  _onAdd() {
    let { block, flux } = this.props

    flux.send(Actions.create, block.type, block)
  }

})

export default Section
