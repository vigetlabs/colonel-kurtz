import Actions    from 'actions/blocks'
import Colonel    from '../../colonel'
import Toolbar    from '../toolbar'
import contextify from 'test/contextify'

describe('Components - Toolbar', function() {
  let TestUtils = React.addons.TestUtils
  let app, block

  beforeEach(function(done) {
    app = new Colonel({ el : document.createElement('div') })

    app.start(function() {
      app.send(Actions.create, 'section')
      block = app.pull('blocks')[0]
    }, done)
  })

  it ('calls onDestroy when the destroy button is clicked', function() {
    let test = contextify(Toolbar, app, { block })
    let spy  = sinon.spy(app, 'send')

    TestUtils.Simulate.click(test.refs.destroy.getDOMNode())

    app.send.should.have.been.calledWith(Actions.destroy, block.id)
  })

  it ('calls onDestroy when the destroy button is clicked', function() {
    let test = contextify(Toolbar, app, { block })
    let spy  = sinon.spy(app, 'send')

    TestUtils.Simulate.click(test.refs.moveUp.getDOMNode())

    app.send.should.have.been.calledWith(Actions.shift, block.id, -1)
  })

  it ('calls onDestroy when the destroy button is clicked', function() {
    let test = contextify(Toolbar, app, { block })
    let spy  = sinon.spy(app, 'send')

    TestUtils.Simulate.click(test.refs.moveDown.getDOMNode())

    app.send.should.have.been.calledWith(Actions.shift, block.id, 1)
  })

})
