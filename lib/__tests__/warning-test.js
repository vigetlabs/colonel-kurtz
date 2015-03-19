import warning from 'warning'

describe('warning', function() {
  let env = warning.env

  afterEach(function() {
    warning.env = env
  })

  it ('warns in development', function() {
    let spy = sinon.spy(console, 'warn')
    warning('test')
    spy.should.have.been.called
    spy.restore()
  })

  it ('does not warn in production', function() {
    let spy = sinon.spy(console, 'warn')

    warning.env = 'production'

    spy(console, 'warn')

    warning('test')

    spy.should.have.been.called
    spy.restore()
  })

})
