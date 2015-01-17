import Dispatcher from 'dispatcher'
import seed       from 'utils/seed'

describe('Utils - seed', function() {

  it ('given an id and a list of blocks, it injects data', function() {
    let spy = sinon.stub(Dispatcher, 'dispatch')
    seed(0, [{}]);
    spy.should.have.been.called
    spy.restore()
  })

})
