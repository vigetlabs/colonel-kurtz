jest.dontMock('../index');

describe('Bus', function() {

  it ('can subscribe callbacks', function() {
    var Bus = require('../index');
    var mock = jest.genMockFunction();

    Bus.subscribe(mock);
    Bus.publish();

    expect(mock).toBeCalled();
  })

  it ('can unsubscribed callbacks', function() {
    var Bus = require('../index');
    var mock = jest.genMockFunction();

    Bus.subscribe(mock);
    Bus.unsubscribe(mock);
    Bus.publish();

    expect(mock).not.toBeCalled();
  });

});
