jest.dontMock('../mode_selection')
jest.dontMock('../ui/button')
jest.dontMock('../../constants/mode_constants')

describe('Components - ModeSelection', function() {
  var React         = require('react/addons')
  var Test          = React.addons.TestUtils
  var ModeSelection = require('../mode_selection')
  var UpdateEditor  = require('../../actions/editor/update')

  it ('executes the UpdateEditor action when a tab is clicked', function() {
    var editor    = { preview: true }
    var component = Test.renderIntoDocument(<ModeSelection editor={ editor } />)
    var node      = component.getDOMNode().querySelector('button:not([disabled])')

    Test.Simulate.click(node)

    expect(UpdateEditor).toBeCalled()
  })

  it ('renders nothing if the editor preview is set to false', function() {
    var editor    = { preview: false }
    var component = Test.renderIntoDocument(<ModeSelection editor={ editor } />)

    expect(component.getDOMNode()).toEqual(null)
  })

})
