/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import React from 'react'
import Animator from './Animator'
import Blocks from '../domains/Blocks'
import EditorBlock from './EditorBlock'
import Switch from './Switch'

export default class App extends React.Component {
  getBlock(block, i) {
    return <EditorBlock key={block} app={this.props.app} block={block} />
  }

  render() {
    let { app } = this.props

    let parents = Blocks.filterChildren(app.state.blocks)

    return (
      <div className="colonel">
        <Switch app={app} />
        <Animator classNames="col-block-children">
          <>{parents.map(this.getBlock, this)}</>
        </Animator>
      </div>
    )
  }
}
