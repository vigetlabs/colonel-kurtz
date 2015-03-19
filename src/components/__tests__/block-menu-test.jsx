import Block      from 'models/block'
import Colonel    from 'colonel'
import BlockMenu  from 'components/block_menu'

let TestUtils = React.addons.TestUtils

describe('Components - BlockMenu', function() {

  it ('renders a list of available block types with proper context', function() {
    let app = new Colonel({})
    app.stores.blockTypes._create({ id: 'fiz' })

    let block     = new Block({ type: 'fiz' })
    let component = TestUtils.renderIntoDocument(<BlockMenu allowed={ [ 'fiz' ] } block={ block } blockTypes={ app.stores.blockTypes } onAdd={ sinon.mock() } />)

    component.getDOMNode().children.length.should.equal(1)
  })

  it ('renders nothing if there are no available block types', function() {
    let app       = new Colonel({})
    let block     = new Block({ type: 'fiz' })

    let component = TestUtils.renderIntoDocument(<BlockMenu allowed={ [] } block={ block } blockTypes={ app.stores.blockTypes } onAdd={ sinon.mock() } />)

    component.getDOMNode().children.length.should.equal(0)
  })

})
