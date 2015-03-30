/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import Actions    from 'actions/blocks'
import BlockTypes from 'stores/block_type_store'
import Blocks     from 'stores/block_store'
import Button     from 'components/ui/button'
import Section    from 'components/section'
import React      from 'react'

let App = React.createClass({

  propTypes: {
    app : React.PropTypes.object.isRequired
  },

  getInitialState() {
    return this.getState()
  },

  getState() {
    return {
      blocks : this.props.app.get(Blocks)
    }
  },

  componentDidMount() {
    this.props.app.listen(() => this.setState(this.getState()))
  },

  getSection(block, i, parents) {
    let isLast = i === (parents.length - 1)

    return (<Section key={ block.id } block={ block } last={ isLast } app={ this.props.app } />)
  },

  render() {
    let blocks = this.state.blocks.filter(i => !i.parent)
    let onAdd  = this.props.app.prepare(Actions.create, 'section', 0, null)

    return (
      <div className="colonel">
        <Button className="col-btn-fab" onClick={ onAdd }>+</Button>
        { blocks.map(this.getSection) }
      </div>
    )
  }

})

export default App
