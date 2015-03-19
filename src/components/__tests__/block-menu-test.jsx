import BlockMenu from 'components/block_menu'
import Block     from 'models/block'
import Colonel   from 'colonel'

let TestUtils = React.addons.TestUtils

describe.only('Components - BlockMenu', function() {
  let app = new Colonel({})

  let Context = React.createClass({
    childContextTypes: {
      allowed : React.PropTypes.array.isRequired,
      flux    : React.PropTypes.object.isRequired
    },

    getChildContext() {
      return {
        allowed : this.props.allowed,
        flux    : app
      }
    },

    getDefaultProps() {
      return { allowed: [] }
    },

    render() {
      return (<BlockMenu block={ this.props.block } ref="menu" />)
    }
  })

  it ('renders a list of available block types with proper context', function() {
    let block     = new Block({ type: 'fiz' })
    let component = TestUtils.renderIntoDocument(<Context allowed={ [ 'fiz' ] } block={ block } />)

    component.refs.menu.refs.should.have.property('buttons')
  })

  it ('renders nothing if there are no available block types', function() {
    let block     = new Block({ type: 'fiz' })
    let component = TestUtils.renderIntoDocument(<Context block={ block } />)

    component.refs.menu.refs.should.not.have.property('buttons')
  })

})
