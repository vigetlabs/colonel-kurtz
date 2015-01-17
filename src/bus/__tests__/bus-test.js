import Bus from '../index'

describe('Bus', () => {

  it ('can subscribe callbacks', function() {
    let stub = sinon.stub()

    Bus.subscribe(stub);
    Bus.publish();

    stub.should.have.been.called
  })

  it ('can unsubscribed callbacks', function() {
    let stub = sinon.stub()

    Bus.subscribe(stub);
    Bus.unsubscribe(stub);
    Bus.publish();

    stub.should.not.have.been.called
  });

});
