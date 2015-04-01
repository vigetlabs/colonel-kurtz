import Actions from 'actions/blocks'
import Colonel from '../../colonel'
import Toolbar from '../toolbar'

describe('Components - Toolbar', function() {
  let TestUtils = React.addons.TestUtils
  let app, block

  beforeEach(function(done) {
    app = new Colonel({ el : document.createElement('div') })

    app.start(function() {
      app.send(Actions.create, 'section')
      block = app.pull('blocks', i => i[0])
    }, done)
  })

  it ('calls onDestroy when the destroy button is clicked', function() {
    let spy  = sinon.spy(app, 'send')
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.destroy.getDOMNode())

    app.send.should.have.been.called;
  })

  it ('calls onMove when the move up button is clicked', function() {
    let spy  = sinon.spy(app, 'send')
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.moveUp.getDOMNode())

    app.send.should.have.been.calledWith(Actions.shift, block.id, -1)
  })

  it ('calls onMove when the move down button is clicked', function() {
    let spy  = sinon.spy(app, 'send')
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.moveDown.getDOMNode())

    app.send.should.have.been.calledWith(Actions.shift, block.id, 1)
  })

})
