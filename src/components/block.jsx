import Pure  from 'pure'
import React from 'react'

let Block = React.createClass({

  contextTypes: {
    flux: React.PropTypes.object.isRequired
  },

  propTypes: {
    block     : React.PropTypes.object.isRequired,
    blockType : React.PropTypes.object.isRequired
  },

  mixins: [ Pure ],

  render() {
    let { block, blockType }    = this.props
    let { component:Component } = blockType

    return (
      <div className="col-block-child">
        <Component ref="block" initialContent={ block.content } updateContent={ this._onUpdateContent } />
      </div>
    )
  },

  _onUpdateContent(content) {
    this.context.flux.actions.blocks.update(this.props.block.id, content)
  }

})

export default Block
