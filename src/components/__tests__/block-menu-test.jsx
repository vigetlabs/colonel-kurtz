import EditorStore    from 'stores/editor_store'
import BlockMenu      from  'components/block_menu'
import BlockTypeStore from 'stores/block_type_store'
import BlockStore     from 'stores/block_store'

let TestUtils = React.addons.TestUtils

describe('Components - AddBlock', function() {
  before(function() {
    BlockTypeStore._create({
      id: 'block-menu-test',
      component: React.createClass({
        defaultContent() {},
        render() {
          return (<p>Test</p>)
        }
      })
    })
  })

  it ('can renders a list of available block types', function() {
    let block     = BlockStore._create({ })
    let editor    = EditorStore._create({ id: 'block-menu-test-1', block })
    let component = TestUtils.renderIntoDocument(<BlockMenu editor={ editor } block={ block } />)

    component.refs.should.have.property('buttons')
  })

  it ('can nothing if there are no available block types', function() {
    let block     = BlockStore._create({ type: 'block-menu-test' })
    let editor    = EditorStore._create({ id: 'block-menu-test-2', block, types: [] })
    let component = TestUtils.renderIntoDocument(<BlockMenu editor={ editor } block={ block } />)

    component.refs.should.not.have.property('buttons')
  })

})
