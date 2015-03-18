/* @flow weak */
var Animation   = require('react/lib/ReactCSSTransitionGroup')
var BlockStore  = require('stores/block_store')
var BlockMenu   = require('components/block_menu')
var React       = require('react')

var Editor = React.createClass({

  propTypes: {
    block: React.PropTypes.object.isRequired
  },

  getBlock(block: Block): any {
    return <EditorBlock key={ block.id } block={ block } />
  },

  render(): any {
    let children = BlockStore.childrenFor(this.props.block)

    return (
      <Animation component="div" className="col-content" transitionName="col-appear">
        <BlockMenu key="block_menu" block={ this.props.block } />
        { children.map(this.getBlock) }
      </Animation>
    )
  }

})

module.exports = Editor
