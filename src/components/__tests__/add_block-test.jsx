import AddBlock from 'components/add_block'
import Block    from 'models/block'

let TestUtils = React.addons.TestUtils

describe('Components - AddBlock', function() {
  let blockType = { id: 'c0', icon: 'fiz', label: 'fiz' }
  let block = new Block({})

  it ('can create a new block of a given time when clicked', function() {
    let mock = sinon.mock()
    let component = TestUtils.renderIntoDocument(
      <AddBlock block={ block } blockType={ blockType } onAdd={ mock } />
    )

    TestUtils.Simulate.click(component.getDOMNode())

    mock.should.have.been.called
  })
})
