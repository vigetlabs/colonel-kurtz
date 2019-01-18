/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import React from 'react'
import Animator from './Animator'
import Blocks from '../stores/Blocks'
import EditorBlock from './EditorBlock'
import Switch from './Switch'
import { BlockProvider } from '../contexts/blocks'

let uid = 0

export default class App extends React.Component {
  state = {
    blocks: []
  }

  getBlock(block) {
    let { structure, types } = this.props

    let definition = structure.find(item => item.type === block.type)

    return (
      <React.Fragment key={block.id}>
        <div className="col-block">
          <header>{definition.title}</header>
          {Object.entries(definition.properties).map(([key, props]) =>
            React.createElement(types[props.type], { key, ...props })
          )}
        </div>
        <Switch structure={structure} parent={block.id} />
      </React.Fragment>
    )
  }

  get contextValue() {
    return {
      blocks: this.state.blocks,
      add: (structure, parent) => {
        this.setState({
          blocks: this.state.blocks.concat({
            id: uid++,
            parent,
            type: structure.type,
            content: {},
            children: []
          })
        })
      }
    }
  }

  render() {
    let { structure } = this.props
    let { blocks } = this.state

    let parents = blocks.filter(b => b.parent == null)

    return (
      <BlockProvider value={this.contextValue}>
        <div className="colonel">
          <Switch structure={structure} />
          <Animator className="col-block-children">
            {parents.map(this.getBlock, this)}
          </Animator>
        </div>
      </BlockProvider>
    )
  }
}
