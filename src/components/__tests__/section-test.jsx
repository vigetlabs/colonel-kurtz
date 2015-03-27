import Actions  from 'actions/blocks'
import Block    from 'models/block'
import Colonel  from '../../colonel'
import Section  from '../section'

describe('Components - Section', function() {
  let TestUtils = React.addons.TestUtils
  var flux

  beforeEach(function() {
    flux = new Colonel({
      el   : document.createElement('div'),
      seed : {
        system: { version: process.env.VERSION },
        blocks: [{
          content: {},
          type: 'section',
          blocks: [
            { content: {}, type: 'section' },
            { content: {}, type: 'section' }
          ]
        }]
      }
    })
  })

  it ('gets an editor for every child', function() {
    let block = flux.get('blocks')[0]

    let component = TestUtils.renderIntoDocument(
      <Section block={ block } flux={ flux } />
    )

    component.getDOMNode().querySelectorAll('.col-block').length.should.equal(3)
  })

  it ('does not show an append button if it is marked as last and has no children', function() {
    let block = flux.get('blocks')[1]

    let component = TestUtils.renderIntoDocument(
      <Section block={ new Block({ type: 'section' }) } flux={ flux } last />
    )

    component.refs.append.props.hide.should.equal(true)
  })

  it ('triggers an add action when append is clicked', function() {
    let block = flux.get('blocks')[0]

    sinon.spy(flux, 'send')

    let component = TestUtils.renderIntoDocument(
      <Section block={ block } blocks={ flux.get('blocks') } blockTypes={ flux.get('blockTypes') } flux={ flux } />
    )

    TestUtils.Simulate.click(component.refs.append.getDOMNode())

    flux.send.should.have.been.calledWith(Actions.create, block.type, block, null)
  })

})
