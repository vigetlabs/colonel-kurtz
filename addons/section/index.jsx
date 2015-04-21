import React from 'react'
import './style'

let Section = React.createClass({

  render() {
    return <div>{ this.props.children }</div>
  }

})

export default Section
