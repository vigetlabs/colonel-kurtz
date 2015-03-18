import Fullscreen from '../fullscreen'

let TestUtils = React.addons.TestUtils

describe('Components - Fullscreen', function() {

  it ('executes a given onClick prop', function() {
    let mock = sinon.mock()
    let component = TestUtils.renderIntoDocument(<Fullscreen onClick={ mock } />)

    TestUtils.Simulate.click(component.getDOMNode())

    mock.should.have.been.called
  })

  it ('is not a submit button', function() {
    let mock = sinon.mock()
    let component = TestUtils.renderIntoDocument(<Fullscreen onClick={ mock } />)

    component.getDOMNode().type.should.equal('button')
  })
})
