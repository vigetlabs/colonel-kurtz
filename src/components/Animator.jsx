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
      component      : 'div',
      transitionName : 'col-editor-block'
    }
  },

  render() {
    return React.createElement(Animation, this.props, this.props.children)
  }
})
