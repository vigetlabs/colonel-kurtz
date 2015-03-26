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

  getEditor(block) {
    return (<EditorBlock key={ block.id } block={ block } flux={ this.props.flux } />)
  },

  render() {
    let { block, flux, last } = this.props

    let blockType = findBy(flux.get(BlockTypes), block.type)
    let children  = flux.get(BlockStore).filter(i => i.parent === block)
    let onAdd     = flux.prepare(Actions.create, block.type, block, null)

    return (
      <div>
        <Block block={ block } blockType={ blockType } onDestroy={ flux.prepare(Actions.destroy) }>
          <BlockMenu key="menu" parent={ block } flux={ flux } forceOpen={ !children.length } />
          { children.map(this.getEditor) }
        </Block>
        <Button ref="append" className="col-btn-fab" onClick={ onAdd } hide={ last && !children.length }>+</Button>
      </div>
    )
  }

})

export default Section
