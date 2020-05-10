/**
 * Animator
 * In order to make block animations easy to edit in one place, this
 * component maintains all of this logic.
 */

import React from 'react'
import { CSSTransition } from 'react-transition-group'

const defaultProps = {
  component: 'div',
  classNames: 'col-editor-block',
  timeout: { exit: 280, enter: 280 }
}

export default class Animator extends React.Component {
  render() {
    return React.createElement(CSSTransition, this.props)
  }
}

Animator.defaultProps = defaultProps
