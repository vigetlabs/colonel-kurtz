import BlockMenu      from  'components/block_menu'
import BlockTypeStore from 'stores/block_type_store'
import BlockStore     from 'stores/block_store'

let TestUtils = React.addons.TestUtils

describe('Components - BlockMenu', function() {

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

  let Context = React.createClass({
    childContextTypes: {
      types: React.PropTypes.array.isRequired
    },
    getChildContext() {
      return { types: this.props.types }
    },
    getDefaultProps() {
      return { types: BlockTypeStore.keys() }
    },
    render() {
      return <BlockMenu block={ this.props.block } ref="menu" />
    }
  })

  it ('can renders a list of available block types', function() {
    let block     = BlockStore._create({ })
    let component = TestUtils.renderIntoDocument(<Context block={ block } />)

    component.refs.menu.refs.should.have.property('buttons')
  })

  it ('can nothing if there are no available block types', function() {
    let block     = BlockStore._create({ type: 'block-menu-test' })
    let component = TestUtils.renderIntoDocument(<Context block={ block } />)

    component.refs.menu.refs.should.not.have.property('buttons')
  })

})
