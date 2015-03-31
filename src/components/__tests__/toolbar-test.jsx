import Actions  from 'actions/blocks'
import Toolbar  from '../toolbar'

describe('Components - Toolbar', function() {
  let TestUtils = React.addons.TestUtils

  it ('calls onDestroy when the destroy button is clicked', function() {
    let destroy   = sinon.mock()
    let move      = sinon.mock()
    let component = TestUtils.renderIntoDocument(
      <Toolbar block={{ id: 'test' }} onDestroy={ destroy } onMove={ move }/>
    )

    TestUtils.Simulate.click(component.refs.destroy.getDOMNode())

    destroy.should.have.been.calledWith('test')
  })

  it ('calls onMove when the move up button is clicked', function() {
    let destroy   = sinon.mock()
    let move      = sinon.mock()
    let component = TestUtils.renderIntoDocument(
      <Toolbar block={{ id: 'test' }} onDestroy={ destroy } onMove={ move }/>
    )

    TestUtils.Simulate.click(component.refs.moveUp.getDOMNode())

    move.should.have.been.calledWith(-1)
  })

  it ('calls onMove when the move down button is clicked', function() {
    let destroy   = sinon.mock()
    let move      = sinon.mock()
    let component = TestUtils.renderIntoDocument(
      <Toolbar block={{ id: 'test' }} onDestroy={ destroy } onMove={ move }/>
    )

    TestUtils.Simulate.click(component.refs.moveDown.getDOMNode())

    move.should.have.been.calledWith(1)
  })

})
