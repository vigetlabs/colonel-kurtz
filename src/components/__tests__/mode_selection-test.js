import ModeSelection from '../mode_selection'
import UpdateEditor  from 'actions/editor/update'
import Dispatcher    from 'dispatcher'

let Test = React.addons.TestUtils

describe('Components - ModeSelection', function() {
  let editor    = { preview: true }
  let component = Test.renderIntoDocument(<ModeSelection editor={ editor } />)

  describe('when a button is clicked', function() {
    let button = component.getDOMNode().querySelector('button:not([disabled])')
    let stub   = sinon.stub(Dispatcher, 'dispatch')

    after(function() {
      stub.restore()
    })

    it ('executes the UpdateEditor callback property', function() {
      Test.Simulate.click(button)
      stub.getCall(0).args[0].type.should.equal(UpdateEditor)
    })

  })

})
