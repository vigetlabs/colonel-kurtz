import Block          from 'components/block'
import BlockTypeStore from 'stores/block_type_store'
import BlockStore     from 'stores/block_store'

let TestUtils = React.addons.TestUtils

describe('Components - AddBlock', function() {
  before(function() {
    BlockTypeStore._create({
      id: 'block-test',
      component: React.createClass({
        defaultContent() {},
        render() {
          return (<p>Test</p>)
        }
      })
    })
  })

  it ('can renders the component of its block type', function() {
    let block     = BlockStore._create({ type: 'block-test' })
    let component = TestUtils.renderIntoDocument(<Block block={ block } />)

    component.getDOMNode().textContent.should.equal('Test')
  })

  it ('passes an updateContent callback method to the block', function() {
    let block     = BlockStore._create({ type: 'block-test' })
    let component = TestUtils.renderIntoDocument(<Block block={ block } />)

    component.refs.block.props.updateContent({ foo: 'bar' })
    block.content.foo.should.equal('bar')
  })

  it ('passes initialContent to the block', function() {
    let content   = { test: true }
    let block     = BlockStore._create({ type: 'block-test', content })
    let component = TestUtils.renderIntoDocument(<Block block={ block } />)

    component.refs.block.props.should.have.property('initialContent', content)
  })
})
