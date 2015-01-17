import Dispatcher    from 'dispatcher';
import ModeSelection from '../mode_selection';
import UpdateEditor  from '../../actions/editor/update';

let Test = React.addons.TestUtils

describe('Components - ModeSelection', function() {

  describe('when mounted', function() {
    let component = Test.renderIntoDocument(<ModeSelection editor={{ preview: true }} />)
    let button    = component.getDOMNode().querySelector('button:not([disabled])')

    before(function() {
      sinon.spy(Dispatcher, 'dispatch')
    })

    after(function() {
      Dispatcher.dispatch.restore()
    })

    it ('executes the UpdateEditor action when clicking a tab', function() {
      Test.Simulate.click(button)
      Dispatcher.dispatch.getCall(0).args[0].should.have.property('type', UpdateEditor)
    })

  })

  it ('renders nothing if the editor preview property is false', function() {
    let editor    = { preview: false }
    let component = Test.renderIntoDocument(<ModeSelection editor={ editor } />)

    expect(component.getDOMNode()).to.be.null
  })

})
