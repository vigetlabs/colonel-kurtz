import BlockModel from 'models/block'
import Block      from '../block'
import Colonel    from '../../colonel'

describe('Components - Block', function() {
  let TestUtils = React.addons.TestUtils
  var app

  beforeEach(function(done) {
    app = new Colonel({ el: document.createElement('div') })
    app.start(done)
  })

  it ('triggers update when its child component changes', function() {
    let model = new Block({ type: 'section' })
    let type  = app.get('blockTypes')[0]

    let block = TestUtils.renderIntoDocument(<Block block={ model }
                                                    blockType={ type }
                                                    onDestroy={ sinon.mock() }
                                                    onUpdate={ sinon.mock() } />)

    block.refs.block.props.onChange('foo')
    block.props.onUpdate.should.have.been.calledWith(model.id, 'foo')
  })

})
