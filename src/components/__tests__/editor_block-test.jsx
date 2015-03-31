import Actions     from 'actions/blocks'
import Block       from 'models/block'
import Colonel     from '../../colonel'
import EditorBlock from '../editor_block'

describe('Components - EditorBlock', function() {
  let TestUtils = React.addons.TestUtils
  var app

  beforeEach(function(done) {
    app = new Colonel({
      el   : document.createElement('div'),
      seed : {
        system: { version: process.env.VERSION },
        blocks: [{ content: {}, type: 'section' }]
      }
    })

    app.start(done)
  })

  it ('can create', function() {
    let component = TestUtils.renderIntoDocument(<EditorBlock app={ app } block={ app.pull('blocks')[[0]] } {...app.toObject() } />)
    let spy       = sinon.spy(Actions, 'create')

    component._onCreate('section')

    spy.should.have.been.called
  })

  it ('can update', function() {
    let block     = app.pull('blocks')[0]
    let component = TestUtils.renderIntoDocument(<EditorBlock app={ app } block={ block } {...app.toObject() } />)
    let spy       = sinon.spy(Actions, 'update')
    let content   = { test: 'foo' }

    component._onUpdate(block.id, content)

    spy.should.have.been.calledWith(block.id, content)
  })

  it ('can destroy', function() {
    let block     = app.pull('blocks')[0]
    let component = TestUtils.renderIntoDocument(<EditorBlock app={ app } block={ block } {...app.toObject() } />)
    let spy       = sinon.spy(Actions, 'destroy')

    component._onDestroy(block.id)

    spy.should.have.been.calledWith(block.id)
  })

  it ('can move blocks', function() {
    let component = TestUtils.renderIntoDocument(<EditorBlock app={ app } block={ app.pull('blocks')[[0]] } {...app.toObject() } />)
    let spy       = sinon.spy(Actions, 'shift')

    component._onMove(1)

    spy.should.have.been.calledWith(component.props.block.id, 1)
  })
})
