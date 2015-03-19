import Colonel from 'colonel'

let TestUtils = React.addons.TestUtils

describe('Components - App', function() {
  var app;

  beforeEach(function() {
    app = new Colonel({
      seed: {
        blockTypes: [{
          id: 'app-test',
          component: React.createClass({
            render() { return (<p/>)}
          })
        }]
      }
    })
  })

  it ('can render all children of a block', function() {
    let root = app.stores.blocks._create({ type: 'app-test' })

    let a = app.stores.blocks._create({ parent: root, type: 'app-test' })
    let b = app.stores.blocks._create({ parent: a, type: 'app-test' })
    let c = app.stores.blocks._create({ parent: b, type: 'app-test' })
    let d = app.stores.blocks._create({ parent: c, type: 'app-test' })

    TestUtils.renderIntoDocument(app.create())
  })

})
