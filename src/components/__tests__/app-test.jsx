import App     from '../App'
import Actions from 'actions/blocks'
import Block   from 'models/block'
import Colonel from '../../colonel'

describe('Components - App', function() {
  var flux

  beforeEach(function() {
    flux = new Colonel({ el: document.createElement('div') })
  })

  it ('begins listening to its application when it mounts', function() {
    let app = React.addons.TestUtils.renderIntoDocument(<App flux={ flux } />)

    flux.send(Actions.create, 'section')

    app.state.blocks.length.should.equal(1)
  })

})
