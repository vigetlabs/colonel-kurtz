import App            from '../app'
import BlockStore     from 'stores/block_store'
import BlockTypeStore from 'stores/block_type_store'

let TestUtils = React.addons.TestUtils

describe('Components - App', function() {

  before(function() {
    BlockTypeStore._create({
      id: 'app-test',
      component: React.createClass({
        defaultContent() {},
        render() {
          return (<p>Test</p>)
        }
      })
    })
  })

  it ('can render when given a block', function() {
    TestUtils.renderIntoDocument(<App block={ BlockStore._create({}) } />)
  })

  it ('can render all children of a block', function() {
    let root = BlockStore._create({ type: 'app-test' })

    let a = BlockStore._create({ parent: root, type: 'app-test' })
    let b = BlockStore._create({ parent: a, type: 'app-test' })
    let c = BlockStore._create({ parent: b, type: 'app-test' })
    let d = BlockStore._create({ parent: c, type: 'app-test' })

    TestUtils.renderIntoDocument(<App block={ root } />)
  })

  it ('can go fullscreen', function() {
    let mock = sinon.mock()
    let app  = TestUtils.renderIntoDocument(<App block={ BlockStore._create({}) } onFullscreen={ mock } />)

    TestUtils.Simulate.click(app.refs.fullscreen.getDOMNode())

    mock.should.have.been.called
  })
})
