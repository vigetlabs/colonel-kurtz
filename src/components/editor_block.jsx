/* @flow */
let Animation  = require('react/lib/ReactCSSTransitionGroup')
let Block      = require('components/block')
let BlockMenu  = require('components/block_menu')
let BlockStore = require('stores/block_store')
let Orderable  = require('components/orderable')
let React      = require('react')
let Toolbar    = require('components/toolbar')

let EditorBlock = React.createClass({

  getBlock(block): any {
    return (<EditorBlock key={ block.id } block={ block } />)
  },

  getBlockList() {
    let children = BlockStore.childrenFor(this.props.block)

    return (
      <Animation component="div" className="col-content" transitionName="col-appear">
        { children.map(this.getBlock) }
      </Animation>
    )
  },

  render(): any {
    let { block } = this.props

    return block.parent ? (
      <div>
        <Orderable block={ block }>
          <BlockMenu block={ block } position={ block.parent }/>

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
