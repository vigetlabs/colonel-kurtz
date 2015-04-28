import Animator from 'components/Animator'
import Block    from 'components/Block'
import Switch   from 'components/Switch'
import React    from 'react'

let EditorBlock = React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getBlock(block, i, list) {
    return (<EditorBlock key={ block } app={ this.props.app } block={ block } />)
  },

  render() {
    let { app, block } = this.props

    let children = app.refine('blocks').filter(i => i.parent === block)

    return (
      <div className="col-editor-block">
        <Block app={ app } block={ block }>
          <Switch app={ app } parent={ block } />
          <Animator>{ children.map(this.getBlock) }</Animator>
        </Block>
        <Switch app={ app } position={ block } parent={ block.parent } />
      </div>
    )
  }

})

export default EditorBlock
