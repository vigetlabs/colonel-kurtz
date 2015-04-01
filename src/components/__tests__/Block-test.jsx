import Actions from 'actions/blocks'
import Block   from '../Block'
import Colonel from '../../colonel'

let first = list => list[0]

describe('Components - Block', function() {
  let TestUtils = React.addons.TestUtils
  let app

  beforeEach(function(done) {
    app = new Colonel({ el : document.createElement('div') })

    app.start(app.prepare(Actions.create, 'section'), done)
  })

  it ('adds a class name according to the block id', function() {
    let block     = app.pull('blocks', first)
    let blockType = app.pull('blockTypes', first)

    let subject = TestUtils.renderIntoDocument(
      <Block app={ app } block={ block } blockType={ blockType } />
    )

    subject.getDOMNode().className.should.include(blockType.id)
  })

  it ('triggers update when its child component changes', function() {
    app.send(Actions.create, 'section')

    let block     = app.pull('blocks', first)
    let blockType = app.pull('blockTypes', first)
    let subject   = TestUtils.renderIntoDocument(
      <Block app={ app } block={ block } blockType={ blockType } />
    )

    sinon.spy(app, 'send')

    subject.refs.block.props.onChange({ fiz: 'buzz' })

    app.send.should.have.been.called
  })

})
