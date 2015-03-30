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

  it ('can update', function() {
    let block     = app.get('blocks')[0]
    let component = TestUtils.renderIntoDocument(<EditorBlock block={ block } app={ app } />)

    component.refs.block.props.onUpdate(block.id, { test: 'foo' })
    block.content.should.have.property('test', 'foo')
  })

  it ('can destroy', function() {
    let block     = app.get('blocks')[0]
    let component = TestUtils.renderIntoDocument(<EditorBlock block={ block } app={ app } />)

    component.refs.block.props.onDestroy(block.id)
    app.get('blocks').length.should.equal(0)
  })

})
