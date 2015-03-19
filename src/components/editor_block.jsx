import Animation  from 'react/lib/ReactCSSTransitionGroup'
import Block      from 'components/block'
import BlockMenu  from 'components/block_menu'
import BlockStore from 'stores/block_store'
import Orderable  from 'components/orderable'
import React      from 'react'
import Toolbar    from 'components/toolbar'

let EditorBlock = React.createClass({

  contextTypes: {
    actions : React.PropTypes.object.isRequired,
    allowed : React.PropTypes.array.isRequired,
    stores  : React.PropTypes.object.isRequired
  },

  propTypes: {
    block : React.PropTypes.object.isRequired
  },

  getBlock(block): any {
    return React.createElement(EditorBlock, {
      ...this.props,
      key   : block.id,
      block : block
    })
  },

  getBlockList() {
    let { block } = this.props
    let { blocks } = this.context.stores

    return (
      <Animation component="div" className="col-content" transitionName="col-appear">
        { blocks.childrenFor(block).map(this.getBlock) }
      </Animation>
    )
  },

  render(): any {
    let { block } = this.props

    return block.parent ? (
      <div>
        <Orderable block={ block }>
          <BlockMenu block={ block } position={ block.parent } />

          <Block block={ block } />

          { this.getBlockList() }

          <Toolbar block={ block } />
        </Orderable>

        <BlockMenu block={ block.parent } position={ block } />
      </div>
    ): this.getBlockList()
  }
})

module.exports = EditorBlock
