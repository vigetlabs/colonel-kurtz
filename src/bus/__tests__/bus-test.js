jest.dontMock('../index');

describe('Bus', function() {

  it ('can be subscribed to', function() {
    var Bus = require('../index');
    var mock = jest.genMockFunction();

    Bus.subscribe(mock);
    Bus.publish();

    expect(mock).toBeCalled();
  })

  it ('can be subscribed to', function() {
    var Bus = require('../index');
    var mock = jest.genMockFunction();

    Bus.subscribe(mock);
    Bus.unsubscribe(mock);
    Bus.publish();

    expect(mock).not.toBeCalled();
  });

});
