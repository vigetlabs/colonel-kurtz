import Block     from 'components/Block'
import BlockMenu from 'components/BlockMenu'
import React     from 'react'
import findBy    from 'utils/findBy'

export default React.createClass({
  propTypes: {
    app        : React.PropTypes.object.isRequired,
    block      : React.PropTypes.object.isRequired,
    blockTypes : React.PropTypes.array.isRequired
  },

  render() {
    let { app, block, blockTypes } = this.props

    return (
      <div>
        <Block app={ app } block={ block } blockType={ findBy(blockTypes, block.type) } />
        <BlockMenu app={ app } blockTypes={ blockTypes } position={ block } parent={ block.parent } />
      </div>
    )
  }
})
