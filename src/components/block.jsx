import Pure  from 'pure'
import React from 'react'

let Block = React.createClass({

  contextTypes: {
    actions : React.PropTypes.object.isRequired,
    stores  : React.PropTypes.object.isRequired
  },

  propTypes: {
    block : React.PropTypes.object.isRequired
  },

  mixins: [ Pure ],

  render() {
    let { block }      = this.props
    let { blockTypes } = this.context.stores

    let Component = blockTypes.find(block.type).component

    return (
      <div className="col-block-child">
        <Component ref="block"
                   initialContent={ block.content }
                   updateContent={ this._onUpdateContent } />
      </div>
    )
  },

  _onUpdateContent(content) {
    this.context.actions.blocks.update(this.props.block.id, content)
  }

})

export default Block
