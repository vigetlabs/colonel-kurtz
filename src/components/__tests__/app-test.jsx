import App     from '../App'
import Actions from 'actions/blocks'
import Block   from 'models/block'
import Colonel from '../../colonel'

describe('Components - App', function() {
  var app

  beforeEach(function(done) {
    app = new Colonel({
      el: document.createElement('div')
    })

    app.start(done)
  })

  it ('begins listening to its application when it mounts', function() {
    let component = React.addons.TestUtils.renderIntoDocument(<App app={ app } />)

    app.send(Actions.create, 'section')

    component.state.blocks.length.should.equal(1)
  })

})
