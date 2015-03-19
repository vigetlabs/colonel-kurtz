import Block     from 'models/block'
import BlockMenu from 'components/block_menu'

let TestUtils = React.addons.TestUtils

describe.only('Components - BlockMenu', function() {

  it ('renders a list of available block types with proper context', function() {
    let block     = new Block({ type: 'fiz' })
    let component = TestUtils.renderIntoDocument(<BlockMenu allowed={ [ 'fiz' ] } block={ block }/>)

    component.refs.menu.refs.should.have.property('buttons')
  })

  it ('renders nothing if there are no available block types', function() {
    let block     = new Block({ type: 'fiz' })
    let component = TestUtils.renderIntoDocument(<Context block={ block } />)

    component.refs.menu.refs.should.not.have.property('buttons')
  })

})
