/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import BlockActions from 'actions/blocks'
import BlockTypes   from 'stores/block_type_store'
import Blocks       from 'stores/block_store'
import Button       from 'components/ui/button'
import Section      from 'components/section'
import React        from 'react'

let App = React.createClass({

  propTypes: {
    flux : React.PropTypes.object.isRequired
  },

  getInitialState() {
    return this.getState()
  },

  getState() {
    return {
      blocks     : this.props.flux.get(Blocks),
      blockTypes : this.props.flux.get(BlockTypes)
    }
  },

  componentDidMount() {
    this.props.flux.listen(() => this.setState(this.getState()))
  },

  getSection(block) {
    let { blocks, blockTypes } = this.state
    let { flux } = this.props

    let onAdd = () => flux.send(BlockActions.create, block.type, block, null)

    return (
      <div key={ block.id }>
        <Section block={ block } blocks={ blocks } blockTypes={ blockTypes } flux={ flux } />
        <Button className="col-btn-fab" onClick={ onAdd }>+</Button>
      </div>
    )
  },

  render() {
    let blocks = this.state.blocks.filter(i => !i.parent)
    let onAdd = () => this.props.flux.send(BlockActions.create, 'section', 0, null)

    return (
      <div className="colonel">
        <Button className="col-btn-fab" onClick={ onAdd }>+</Button>
        { blocks.map(this.getSection) }
      </div>
    )
  }

})

export default App
