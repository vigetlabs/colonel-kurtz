/* @flow */
var Animation = require('react/lib/ReactCSSTransitionGroup')
var Block     = require('components/block')
var BlockMenu = require('components/block_menu')
var HasBlocks = require('mixins/hasBlocks')
var Orderable = require('components/orderable')
var React     = require('react')
var Toolbar   = require('components/toolbar')

var EditorBlock = React.createClass({
  mixins: [ HasBlocks ],

  getBlock(block): any {
    return <EditorBlock key={ block.id } block={ block } editor={ this.props.editor } />
  },

  render(): any {
    var { block, editor } = this.props

    return (
      <div>
        <Orderable block={ block }>
          <BlockMenu ref="prepend" block={ block } editor={ editor } position={ block.parent }/>

          <div className="col-block-children">
            <Block block={ block } mode={ editor.mode } />
          </div>

          <Animation component="div" className="col-blocks" transitionName="col-appear">
            { this.state.blocks.map(this.getBlock) }
          </Animation>

          <Toolbar block={ block } />
        </Orderable>

        <BlockMenu ref="append" block={ block.parent } editor={ editor } position={ block } />
      </div>
    )
  }
})

module.exports = EditorBlock
