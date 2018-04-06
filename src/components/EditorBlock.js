import Block from './Block'
import React from 'react'
import Blocks from '../stores/Blocks'

export default class EditorBlock extends React.Component {
  getBlock(block) {
    return <EditorBlock key={block} app={this.props.app} block={block} />
  }

  render() {
    let { app, block } = this.props

    return (
      <Block app={app} block={block}>
        {Blocks.getChildren(app.state.blocks, block).map(this.getBlock, this)}
      </Block>
    )
  }
}
