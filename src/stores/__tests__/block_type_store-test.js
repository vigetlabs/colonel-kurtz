import BlockTypeStore from 'stores/block_type_store'

describe('Stores - Block Type', function() {
  let store = null

  beforeEach(function() {
    store = new BlockTypeStore({
      blockTypes: {
        create : 'CREATE'
      }
    }, [])
  })

  it ('can create a record', function() {
    store._create({
      id: 'test',
      component: React.createClass({ render() { return (<p>Test</p>) }})
    })

    store.find('test').should.be.ok
  })

})
