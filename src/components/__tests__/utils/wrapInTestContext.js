import { Component } from 'react'
import TestBackend from 'react-dnd/modules/backends/Test'
import { DragDropContext } from 'react-dnd'

module.exports = function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return <DecoratedComponent {...this.props} />
      }
    }
  )
}
