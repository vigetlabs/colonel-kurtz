/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import Animator    from 'components/Animator'
import EditorBlock from 'components/EditorBlock'
import React       from 'react'
import Switch      from 'components/Switch'

export default React.createClass({

  propTypes: {
    app : React.PropTypes.object.isRequired
  },

  getBlock(block, i) {
    return (<EditorBlock key={ block } app={ this.props.app } block={ block } />)
  },

  render() {
    let { app } = this.props

    let top = app.refine('blocks').filter(i => !i.parent)

    return (
      <div className="colonel">
        <Switch app={ app } />
        <Animator>{ top.map(this.getBlock) }</Animator>
      </div>
    )
  }

})
