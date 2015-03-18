/* @flow */
var Animation  = require('react/lib/ReactCSSTransitionGroup')
var Block      = require('components/block')
var BlockMenu  = require('components/block_menu')
var BlockStore = require('stores/block_store')
var Orderable  = require('components/orderable')
var React      = require('react')
var Toolbar    = require('components/toolbar')

var EditorBlock = React.createClass({

  getBlock(block): any {
    return (<EditorBlock key={ block.id } block={ block } />)
  },

  render(): any {
    var { block } = this.props
    let children = BlockStore.childrenFor(block)

    return (
      <div>
        <Orderable block={ block }>
          <BlockMenu ref="prepend" block={ block } position={ block.parent }/>

          <div className="col-block-children">
            <Block block={ block } />
          </div>

          <Animation component="div" className="col-blocks" transitionName="col-appear">
            { children.map(this.getBlock) }
          </Animation>

          <Toolbar block={ block } />
        </Orderable>

        <BlockMenu ref="append" block={ block.parent } position={ block } />
      </div>
    )
  }
})

module.exports = EditorBlock
