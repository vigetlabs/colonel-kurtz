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
        component: { render() { return (<p/>) } }
      }]
    })

    app.start(function() {
      app.push(Actions.create, 'section')
      app.push(Actions.create, 'section')
    }, function() {
      app.push = sinon.mock()
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

  describe('When the "Remove" button is clicked', function() {

    it ('calls the destroy action', function() {
      let block = app.refine('blocks').first()
      let test  = TestUtils.renderIntoDocument(<Block app={ app } block={ block } />)

      test.refs.menu.setState({ open: true })

      TestUtils.Simulate.click(test.refs.destroy.getDOMNode())

      app.push.should.have.been.calledWith(Actions.destroy, block.id)
    })
  })

  describe('When the "Move Up" button is clicked', function() {
    it ('calls the move action', function() {
      let block = app.refine('blocks').last()
      let test  = TestUtils.renderIntoDocument(<Block app={ app } block={ block } />)

      test.refs.menu.setState({ open: true })

      TestUtils.Simulate.click(test.refs.moveUp.getDOMNode())

      app.push.should.have.been.calledWith(Actions.move, block, -1)
    })

    it ('is disabled if it is the first block', function() {
      let block = app.refine('blocks').first()
      let test = TestUtils.renderIntoDocument(<Block app={ app } block={ block } />)

      test.refs.menu.setState({ open: true })

      test.refs.moveUp.isDisabled().should.equal(true)
    })
  })

  describe('When the "Move Down" button is clicked', function() {
    it ('calls the move action', function() {
      let block = app.refine('blocks').first()
      let test = TestUtils.renderIntoDocument(<Block app={ app } block={ block } />)

      test.refs.menu.setState({ open: true })

      TestUtils.Simulate.click(test.refs.moveDown.getDOMNode())

      app.push.should.have.been.calledWith(Actions.move, block, 1)
    })

    it ('is disabled if it is the last block', function() {
      let block = app.refine('blocks').last()
      let test = TestUtils.renderIntoDocument(<Block app={ app } block={ block } />)

      test.refs.menu.setState({ open: true })

      test.refs.moveDown.isDisabled().should.equal(true)
    })
  })

})
