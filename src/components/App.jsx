/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import EditorBlock from 'components/EditorBlock'
import React       from 'react'
import Switch      from 'components/Switch'
import isRoot      from '../utils/isRoot'

export default React.createClass({

  propTypes: {
    app : React.PropTypes.object.isRequired
  },

  getBlock(block, i) {
    return (<EditorBlock key={ block.id } block={ block } { ...this.props } />)
  },

  render() {
    let { app } = this.props

    return (
      <div className="colonel">
        <Switch app={ app } />
        { app.pull('blocks', isRoot).map(this.getBlock) }
      </div>
    )
  }

})
