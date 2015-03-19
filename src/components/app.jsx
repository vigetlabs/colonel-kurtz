/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import React   from 'react'
import Section from 'components/section'

let App = React.createClass({

  propTypes: {
    allowed : React.PropTypes.array,
    flux    : React.PropTypes.object.isRequired,
    root    : React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      allowed: []
    }
  },

  getElement(block) {
    let { allowed, flux } = this.props

    return (<Section key={ block.id } allowed={ allowed } block={ block } flux={ flux } />)
  },

  render() {
    return (<div>{ this.props.root.map(this.getElement) }</div>)
  }

})

module.exports = App
