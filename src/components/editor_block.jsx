import Actions   from 'actions/blocks'
import Block     from 'components/block'
import BlockMenu from 'components/block_menu'
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
        <Block ref="block" block={ block } blockType={ findBy(blockTypes, block.type) } onUpdate={ this._onUpdate } onDestroy={ this._onDestroy } />
        <BlockMenu blockTypes={ blockTypes } onAdd={ this._onCreate } position={ block } />
      </div>
    )
  },

  _onCreate(type, position) {
    let { app, block } = this.props

    app.send(Actions.create, type, position, block.parent)
  },

  _onUpdate(id, content) {
    this.props.app.send(Actions.update, id, content)
  },

  _onDestroy(id) {
    this.props.app.send(Actions.destroy, id)
  }

})
