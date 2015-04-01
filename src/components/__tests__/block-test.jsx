import Actions from 'actions/blocks'
import Block   from '../block'
import Colonel from '../../colonel'

describe.only('Components - Block', function() {
  let TestUtils = React.addons.TestUtils
  let app

  beforeEach(function(done) {
    app = new Colonel({ el : document.createElement('div') })

    app.start(app.prepare(Actions.create, 'section'),
              done)
  })

  it ('adds a class name according to the block id', function() {
    let blockType = app.pull('blockTypes')[0]

    let subject   = TestUtils.renderIntoDocument(
      <Block app={ app } block={ app.pull('blocks')[0] } blockType={ blockType } />
    )

    subject.getDOMNode().className.should.match(blockType.id)
  })

  it ('triggers update when its child component changes', function() {
    app.send(Actions.create, 'section')

    sinon.mock(app, 'send')

    let block     = app.pull('blocks')[0]
    let blockType = app.pull('blockTypes')[0]
    let subject   = TestUtils.renderIntoDocument(<Block app={ app } block={ block } blockType={ blockType } />)

    subject.refs.block.props.onChange({ fiz: 'buzz' })

    app.send.should.have.been.called
  })

})
