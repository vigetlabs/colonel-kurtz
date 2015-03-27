import Block       from 'models/block'
import Colonel     from '../../colonel'
import EditorBlock from '../editor_block'

describe('Components - EditorBlock', function() {
  let TestUtils = React.addons.TestUtils
  var flux

  beforeEach(function() {
    flux = new Colonel({
      el   : document.createElement('div'),
      seed : {
        system: { version: process.env.VERSION },
        blocks: [{ content: {}, type: 'section' }]
      }
    })
  })

  it ('can update', function() {
    let block     = flux.get('blocks')[0]
    let component = TestUtils.renderIntoDocument(<EditorBlock block={ block } flux={ flux } />)

    component.refs.block.props.onUpdate(block.id, { test: 'foo' })
    block.content.should.have.property('test', 'foo')
  })

  it ('can destroy', function() {
    let block     = flux.get('blocks')[0]
    let component = TestUtils.renderIntoDocument(<EditorBlock block={ block } flux={ flux } />)

    component.refs.block.props.onDestroy(block.id)
    flux.get('blocks').length.should.equal(0)
  })

})
