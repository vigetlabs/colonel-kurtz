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
      <Section block={ block } blocks={ flux.get('blocks') } blockTypes={ flux.get('blockTypes') } flux={ flux } />
    )

    component.getDOMNode().querySelectorAll('.col-block').length.should.equal(3)
  })

  it ('does not append an editor if it is marked as last', function() {
    let block = flux.get('blocks')[1]

    let component = TestUtils.renderIntoDocument(
      <Section block={ block } blocks={ flux.get('blocks') } blockTypes={ flux.get('blockTypes') } flux={ flux } last />
    )

    component.refs.should.not.have.property('append')
  })

  it ('triggers an add action when append is clicked', function() {
    let block = flux.get('blocks')[0]

    let component = TestUtils.renderIntoDocument(
      <Section block={ block } blocks={ flux.get('blocks') } blockTypes={ flux.get('blockTypes') } flux={ flux } />
    )

    sinon.spy(flux, 'send')

    TestUtils.Simulate.click(component.refs.append.getDOMNode())
    flux.send.should.have.been.calledWith(Actions.create, block.type, block)
  })

})
