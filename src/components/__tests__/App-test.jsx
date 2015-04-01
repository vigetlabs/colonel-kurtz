import App     from '../App'
import Colonel from '../../colonel'

describe('App', function() {
  let TestUtils = React.addons.TestUtils
  let app;

  beforeEach(function(done) {
    app = new Colonel({ el: document.createElement('div') })
    app.start(done)
  })

  it ('appends a block when the append button is clicked', function() {
    let component = TestUtils.renderIntoDocument(<App app={ app } { ...app.toObject() } />)

    TestUtils.Simulate.click(component.refs.append.getDOMNode())

    app.pull('blocks').length.should.equal(1)
  })

})
