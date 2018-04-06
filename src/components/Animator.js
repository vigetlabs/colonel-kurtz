/**
 * Animator
 * In order to make block animations easy to edit in one place, this
 * component maintains all of this logic.
 */

import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

export default class Animator extends React.Component {
  static defaultProps = {
    component: 'div',
    transitionName: 'col-editor-block',
    transitionEnterTimeout: 280,
    transitionLeaveTimeout: 280
  }

  render() {
    return React.createElement(CSSTransitionGroup, this.props)
  }
}
