import BlockTypeStore from '../block_type_store'
import manifest from 'manifest'

describe('Stores - BlockType', function() {

  it ('stringifies to a key', function() {
    `${ BlockTypeStore }`.should.equal('blockTypes')
  })

  it ('starts with the blockType entry in the manifest', function() {
    BlockTypeStore.getInitialState().should.equal(manifest.blockTypes)
  })

  it ('always includes the manifest when seeding', function() {
    let state = BlockTypeStore.deserialize([])
    let first = manifest.blockTypes[0]

    state[0].should.have.property('id', first.id)
  })

})
