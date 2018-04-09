import React from 'react'

class TestBlockType extends React.Component {
  getMenuItems() {
    return [{ id: 'test', label: 'Test' }]
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

TestBlockType.defaultProps = {
  content: {
    text: 'Test'
  }
}

export default {
  id: 'test',
  label: 'Test',
  component: TestBlockType
}
