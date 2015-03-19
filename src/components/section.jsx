import BlockMenu   from 'components/block_menu'
import EditorBlock from 'components/editor_block'
import React       from 'react'

let Section = React.createClass({

  propTypes: {
    allowed : React.PropTypes.array.isRequired,
    flux    : React.PropTypes.object.isRequired
  },

  render() {
    let { block, allowed, flux } = this.props

    return (
      <div className="colonel" key={ block.id }>
        <BlockMenu allowed={ allowed } block={ block } blockTypes={ flux.stores.blockTypes } onAdd={ flux.actions.blocks.create } />
        <EditorBlock allowed={ allowed } flux={ flux } block={ block } blockTypes={ flux.stores.blockTypes } />
      </div>
    )
  }

})

module.exports = Section
