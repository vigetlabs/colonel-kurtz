import Actions      from 'actions/blocks'
import Block        from 'components/block'
import BlockMenu    from 'components/block_menu'
import BlockTypes   from 'stores/block_type_store'
import Blocks       from 'stores/block_store'
import React        from 'react'
import findBy       from 'utils/findBy'

let EditorBlock = React.createClass({

  propTypes: {
    block : React.PropTypes.object.isRequired,
    app   : React.PropTypes.object.isRequired
  },

  getBlockMenu() {
    let { block, app } = this.props

    return (<BlockMenu key="block_menu" parent={ block.parent } position={ block } app={ app } />)
  },

  render() {
    let { block, app } = this.props

    let children  = app.get(Blocks).filter(i => i.parent === block)
    let blockType = findBy(app.get(BlockTypes), block.type)

    return (
      <div>
        <Block ref="block" block={ block } blockType={ blockType } onUpdate={ this._onUpdate } onDestroy={ this._onDestroy } />
        { this.getBlockMenu(block) }
      </div>
    )
  },

  _onUpdate(id, content) {
    this.props.app.send(Actions.update, id, content)
  },

  _onDestroy(id) {
    this.props.app.send(Actions.destroy, id)
  }

})

export default EditorBlock
