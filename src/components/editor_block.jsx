import Animation   from 'react/lib/ReactCSSTransitionGroup'
import Block       from 'components/block'
import BlockMenu   from 'components/block_menu'
import Orderable   from 'components/orderable'
import React       from 'react'
import Toolbar     from 'components/toolbar'

let EditorBlock = React.createClass({

  propTypes: {
    allowed    : React.PropTypes.array.isRequired,
    block      : React.PropTypes.object.isRequired,
    blockTypes : React.PropTypes.object.isRequired,
    flux       : React.PropTypes.object.isRequired
  },

  getBlock(block): any {
    let { allowed, blockTypes, flux } = this.props

    return (<EditorBlock key={ block.id } flux={ flux } allowed={ allowed } block={ block } blockTypes={ blockTypes } />)
  },

  getBlockList() {
    let { block, flux }  = this.props

    return (
      <Animation component="div" className="col-content" transitionName="col-appear">
        { flux.blocks.childrenFor(block).map(this.getBlock) }
      </Animation>
    )
  },

  render(): any {
    let { allowed, block, blockTypes } = this.props
    let { create, update, move, destroy } = this.props.flux.actions.blocks

    return block.parent ? (
      <div>
        <Orderable block={ block } onMove={ move }>
          <BlockMenu allowed={ allowed }
                     block={ block }
                     blockTypes={ blockTypes }
                     position={ block.parent }
                     onAdd={ create } />

          <Block block={ block } blockType={ blockTypes.find(block.type) } onUpdate={ update } />

          { this.getBlockList() }

          <Toolbar block={ block } onDestroy={ destroy } />
        </Orderable>

        <BlockMenu allowed={ allowed }
                   block={ block.parent }
                   blockTypes={ blockTypes }
                   position={ block }
                   onAdd={ create } />
      </div>
    ): this.getBlockList()
  }
})

module.exports = EditorBlock
