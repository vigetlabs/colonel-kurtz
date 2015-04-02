import Toolbar from '../Toolbar'
import { shift, destroy } from 'actions/blocks'

describe('Components - Toolbar', function() {
  let TestUtils = React.addons.TestUtils
  let app, block

  beforeEach(function() {
    app = {
      push: sinon.mock(),
      prepare(...args) {
        return this.push.bind(this, ...args)
      }
    }
    block = { id: 'test', type: 'section' }
  })

  it ('calls onDestroy when the destroy button is clicked', function() {
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.destroy.getDOMNode())

    app.push.should.have.been.calledWith(destroy, block.id)
  })

  it ('calls onMove when the move up button is clicked', function() {
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.moveUp.getDOMNode())

    app.push.should.have.been.calledWith(shift, block.id, -1)
  })

  it ('calls onMove when the move down button is clicked', function() {
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.moveDown.getDOMNode())

    app.push.should.have.been.calledWith(shift, block.id, 1)
  })

})
