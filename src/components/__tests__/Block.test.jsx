import Actions from 'actions/blocks'
import Block   from '../Block'
import Colonel from '../../Colonel'

describe('Components - Block', function() {
  let TestUtils = React.addons.TestUtils
  let app

  beforeEach(function(done) {
    app = new Colonel({
      el : document.createElement('div'),
      blockTypes: [{
        id: 'section',
        label: 'Section',
        component: {
          statics: {
            menu: [{ id: 'test', label: 'Test' }]
          },
          render() { return (<p/>) }
        }
      }]
    })

    app.start(function() {
      app.push(Actions.create, 'section')
      app.push(Actions.create, 'section')
    }, function() {
      sinon.spy(app, 'push')
    }, done)
  })

  it ('adds a class name according to the block id', function() {
    let block = app.refine('blocks').first()

    let subject = TestUtils.renderIntoDocument(
      <Block app={ app } block={ block } />
    )

    subject.getDOMNode().className.should.include(block.type)
  })

  it ('triggers update when its child component changes', function() {
    let block   = app.refine('blocks').first()
    let subject = TestUtils.renderIntoDocument(<Block app={ app } block={ block } />)
    let params  = { fiz: 'buzz' }

    subject.refs.block.props.onChange(params)

    app.push.should.have.been.calledWith(Actions.update, block, params)
  })

  it ('passes menu items from the block type component to the menu', function() {
    let item    = app.refine('blocks').first()
    let subject = TestUtils.renderIntoDocument(<Block app={ app } block={ item } />)
    let { menu } = subject.refs

    menu.setState({ open: true })
    menu.refs.should.have.property('test')
  })

  describe('When a menu item is selected', function() {

    it ('calls `menuWillSelect` upon the sibling block component', function() {
      let item    = app.refine('blocks').first()
      let subject = TestUtils.renderIntoDocument(<Block app={ app } block={ item } />)

      let { menu, block } = subject.refs

      block.menuWillSelect = sinon.mock()

      menu.setState({ open: true })

      TestUtils.Simulate.click(menu.refs.destroy.getDOMNode())

      block.menuWillSelect.should.have.been.called
    })

    it ('does nothing if `menuWillSelect` has not been defined', function() {
      let item    = app.refine('blocks').first()
      let subject = TestUtils.renderIntoDocument(<Block app={ app } block={ item } />)

      let { menu, block } = subject.refs

      menu.setState({ open: true })

      TestUtils.Simulate.click(menu.refs.destroy.getDOMNode())

      app.refine('blocks').first().should.not.equal(item)
    })

  })

})
