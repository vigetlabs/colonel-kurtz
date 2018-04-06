import React from 'react'

export default class DefaultBlockType extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}
