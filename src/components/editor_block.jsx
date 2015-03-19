import Animation  from 'react/lib/ReactCSSTransitionGroup'
import Block      from 'components/block'
import BlockMenu  from 'components/block_menu'
import BlockStore from 'stores/block_store'
import Orderable  from 'components/orderable'
import React      from 'react'
import Toolbar    from 'components/toolbar'

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
    let { block } = this.props
    let { blocks } = this.context.flux.stores

    return (
      <Animation component="div" className="col-content" transitionName="col-appear">
        { blocks.childrenFor(block).map(this.getBlock) }
      </Animation>
    )
  },

  render(): any {
    let { actions, stores } = this.context.flux
    let { block } = this.props

    return block.parent ? (
      <div>
        <Orderable block={ block } onMove={ actions.blocks.move }>
          <BlockMenu block={ block } position={ block.parent } />

          <Block block={ block }
                 blockType={ stores.blockTypes.find(block.type) }
                 onUpdate={ actions.blocks.update } />

          { this.getBlockList() }

          <Toolbar block={ block } onDestroy={ actions.blocks.destroy } />
        </Orderable>

        <BlockMenu block={ block.parent } position={ block } />
      </div>
    ): this.getBlockList()
  }
})

module.exports = EditorBlock
