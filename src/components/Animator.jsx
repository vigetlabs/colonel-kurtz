/**
 * Animator
 * In order to make block animations easy to edit in one place, this
 * component maintains all of this logic.
 */

import Animation from 'react/lib/ReactCSSTransitionGroup'
import React     from 'react'

export default React.createClass({
  getDefaultProps() {
    return {
      transitionName: 'col-editor-block'
    }
  },

  render() {
    return (
      <Animation transitionName="col-editor-block">
        { this.props.children }
      </Animation>
    )
  }
})
