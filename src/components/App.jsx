/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import Animation   from 'react/lib/ReactCSSTransitionGroup'
import EditorBlock from 'components/EditorBlock'
import React       from 'react'
import Switch      from 'components/Switch'

export default React.createClass({

  propTypes: {
    app : React.PropTypes.object.isRequired
  },

  getBlock(block, i) {
    return (<EditorBlock key={ block.id } block={ block } { ...this.props } />)
  },

  render() {
    let { app } = this.props

    let top = app.refine('blocks')
                 .filter(i => !i.parent)

    return (
      <div className="colonel">
        <Switch app={ app } />
        <Animation transitionName="col-editor-block">
          { top.map(this.getBlock) }
        </Animation>
      </div>
    )
  }

})
