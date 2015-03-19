import Animation   from 'react/lib/ReactCSSTransitionGroup'
import Block       from 'components/block'
import BlockMenu   from 'components/block_menu'
import Orderable   from 'components/orderable'
import React       from 'react'
import RemoveBlock from 'components/remove_block'

let EditorBlock = React.createClass({

  contextTypes: {
    allowed : React.PropTypes.array.isRequired,
    flux    : React.PropTypes.object.isRequired
  },

  propTypes: {
    block : React.PropTypes.object.isRequired
  },

  getBlock(block): any {
    return (<EditorBlock key={ block.id } block={ block } />)
  },

  getBlockList() {
    let { block }  = this.props
    let { blocks } = this.context.flux.stores

    return (
      <Animation component="div" className="col-content" transitionName="col-appear">
        { blocks.childrenFor(block).map(this.getBlock) }
      </Animation>
    )
  },

  render(): any {
    let { allowed, flux } = this.context
    let { blockTypes } = flux.stores
    let { block } = this.props

    return block.parent ? (
      <div>
        <Orderable block={ block }>
          <BlockMenu block={ block } blockTypes={ blockTypes } position={ block.parent } />

          <Block block={ block } blockType={ blockTypes.find(block.type) } />

          { this.getBlockList() }

          <div className="col-toolbar">
            <RemoveBlock block={ block } onDestroy={ flux.actions.blocks.destroy } />
          </div>
        </Orderable>

        <BlockMenu block={ block.parent } blockTypes={ blockTypes } position={ block } />
      </div>
    ): this.getBlockList()
  }
})

module.exports = EditorBlock
