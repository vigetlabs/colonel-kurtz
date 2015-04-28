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

    app.start(app.prepare(Actions.create, 'section'), done)
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

    subject.refs.block.props.onChange({ fiz: 'buzz' })

    block.content.should.have.property('fiz', 'buzz')
  })

})
