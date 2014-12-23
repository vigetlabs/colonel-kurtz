jest.dontMock('../mode_selection')
jest.dontMock('../ui/button')
jest.dontMock('../../constants/mode_constants')

describe('Components - ModeSelection', function() {
  var React         = require('react/addons')
  var Test          = React.addons.TestUtils
  var ModeSelection = require('../mode_selection')

  it ('executes an onChange callback when a tab is clicked', function() {
    var mock      = jest.genMockFunction()
    var component = Test.renderIntoDocument(<ModeSelection onChange={ mock } />)
    var node      = component.getDOMNode().querySelector('button:not([disabled])')

    Test.Simulate.click(node)

    expect(mock).toBeCalled()
  })

})
