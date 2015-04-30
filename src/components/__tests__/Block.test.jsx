let Actions   = require('../../actions/blocks')
let Block     = require('../Block')
let Colonel   = require('../../Colonel')
let TestUtils = React.addons.TestUtils
let config    = require('./fixtures/colonelConfig')
let render    = TestUtils.renderIntoDocument

describe('Components - Block', function() {
  let app, component;

  beforeEach(function(done) {
    app = new Colonel(config)

    app.start(function() {
      sinon.spy(app, 'push')
      component = render(<Block app={ app } block={ app.get('blocks')[0] } />)
    }, done)
  })

  it ('adds a class name according to the block id', function() {
    let block = component.props.block
    component.getDOMNode().className.should.include(block.type)
  })

  it ('sends an onMenuOpen callback to the menu it owns', function() {
    component.refs.menu.props.onOpen()
    component.state.should.have.property('menuOpen', true)
  })

  it ('updates a block when its child component changes', function() {
    component.refs.block.props.onChange({ fiz: 'buzz' })
    component.props.block.content.should.have.property('fiz', 'buzz')
  })

  it ('passes menu items from the block type component to the menu', function() {
    let { menu } = component.refs
    component.setState({ menuOpen: true })
    menu.refs.should.have.property('test')
  })

  describe('When a menu item is selected', function() {

    it ('calls `menuWillSelect` upon the sibling block component', function() {
      let { menu, block } = component.refs

      block.menuWillSelect = sinon.mock()

      component.setState({ menuOpen: true })

      TestUtils.Simulate.click(menu.refs.destroy.getDOMNode())

      block.menuWillSelect.should.have.been.called
    })

    it ('does nothing if `menuWillSelect` has not been defined', function() {
      let item = app.get(['blocks', 0])
      let { menu } = component.refs

      component.setState({ menuOpen: true })

      TestUtils.Simulate.click(menu.refs.destroy.getDOMNode())

      app.get(['blocks', 0]).should.not.equal(item)
    })

  })

})
