import BlockStore from 'stores/block_store'
import seed       from 'utils/seed'

describe('Utils - seed', function() {

  it ('given an id and a list of blocks, it injects data', function() {
    let spy = sinon.stub(BlockStore, '_seed')
    seed(null, [{}]);
    spy.should.have.been.called
    spy.restore()
  })

})
