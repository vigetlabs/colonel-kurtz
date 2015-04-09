/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import Animation   from 'react/lib/ReactCSSTransitionGroup'
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
        <Animation transitionName="col-editor-block">
          { app.pull('blocks', isRoot).map(this.getBlock) }
        </Animation>
      </div>
    )
  }

})
