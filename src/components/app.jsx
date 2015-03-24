/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import BlockActions from 'actions/blocks'
import BlockTypes   from 'stores/block_type_store'
import Blocks       from 'stores/block_store'
import Button       from 'components/ui/button'
import EditorBlock  from 'components/editor_block'
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

  getElement(block) {
    return (<EditorBlock key={ block.id } block={ block } flux={ this.props.flux } />)
  },

  render() {
    let blocks = this.state.blocks.filter(i => !i.parent)

    return (
      <div className="colonel">
        <Button className="col-btn-fab" onClick={ this._onAddSection }>+</Button>
        <div className="colonel-wrapper">
          { blocks.map(this.getElement) }
        </div>
      </div>
    )
  },

  _onAddSection(e) {
    e.preventDefault();
    this.props.flux.send(BlockActions.create, 'section', null)
  }

})

export default App
