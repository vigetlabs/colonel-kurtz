import Block          from 'components/block'
import BlockModel     from 'models/block'

let TestUtils = React.addons.TestUtils

describe('Components - Block', function() {
  let component = React.createClass({
    render() {
      return (<p>Test</p>)
    }
  })

  let block = new Block()

  let blockType = { id: 'c0', icon: 'fiz', label: 'fiz', component }

  it ('can renders the component of its block type', function() {
    let component = TestUtils.renderIntoDocument(<Block block={ block } blockType={ blockType } onUpdate={ sinon.mock() }/>)

    component.getDOMNode().textContent.should.equal('Test')
  })

  it ('passes an updateContent callback method to the block', function() {
    let mock = sinon.mock()
    let component = TestUtils.renderIntoDocument(<Block block={ block } blockType={ blockType } onUpdate={ mock }/>)

    component.refs.block.props.updateContent({ foo: 'bar' })

    mock.should.have.been.called
  })
})
