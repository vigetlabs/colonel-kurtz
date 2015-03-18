import App        from '../app'
import BlockStore from 'stores/block_store'

let TestUtils = React.addons.TestUtils

describe('Components - App', function() {

  it ('can render when given a block', function() {
    TestUtils.renderIntoDocument(<App block={ BlockStore._create({}) } />)
  })

  it ('can go fullscreen', function() {
    let mock = sinon.mock()
    let app  = TestUtils.renderIntoDocument(<App block={ BlockStore._create({}) } onFullscreen={ mock } />)

    TestUtils.Simulate.click(app.refs.fullscreen.getDOMNode())

    mock.should.have.been.called
  })
})
