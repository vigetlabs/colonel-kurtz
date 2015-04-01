import Actions    from 'actions/blocks'
import Block      from '../block'
import BlockModel from 'models/block'
import Colonel    from '../../colonel'
import contextify from 'test/contextify'

describe('Components - Block', function() {
  let TestUtils = React.addons.TestUtils
  let app

  beforeEach(function(done) {
    app = new Colonel({ el : document.createElement('div') })
    app.start(done)
  })

  it ('triggers update when its child component changes', function() {
    app.send(Actions.create, 'section')

    let block     = app.pull('blocks')[0]
    let blockType = app.pull('blockTypes')[0]
    let subject   = contextify(Block, app, { block, blockType })

    subject.refs.block.props.onChange({ fiz: 'buzz' })

    block.content.should.have.property('fiz', 'buzz')
  })

})
