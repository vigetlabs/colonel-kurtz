import React from 'react'

export default {
  id: 'test',
  label: 'Test',
  component: React.createClass({
    render() {
      return <div>{ this.props.children }</div>
    }
  })
}
