import Actions from 'actions/blocks'
import Toolbar from '../Toolbar'

describe('Components - Toolbar', function() {
  let TestUtils = React.addons.TestUtils
  let app, block

  beforeEach(function() {
    app = {
      send: sinon.mock(),
      prepare(...args) {
        return this.send.bind(this, ...args)
      }
    }
    block = { id: 'test', type: 'section' }
  })

  it ('calls onDestroy when the destroy button is clicked', function() {
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.destroy.getDOMNode())

    app.send.should.have.been.called;
  })

  it ('calls onMove when the move up button is clicked', function() {
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.moveUp.getDOMNode())

    app.send.should.have.been.calledWith(Actions.shift, block.id, -1)
  })

  it ('calls onMove when the move down button is clicked', function() {
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.moveDown.getDOMNode())

    app.send.should.have.been.calledWith(Actions.shift, block.id, 1)
  })

})
