import ColonelKurtz from 'colonel'

describe('Colonel', function() {

  it('can be subscribed to', function(done) {
    let col = new ColonelKurtz({
      el: document.createElement('div')
    })

    col.listen(() => done())

    col.pump()
  })

  it ('can be unsubscribed to', function() {
    let col = new ColonelKurtz({
      el: document.createElement('div')
    })

    let mock = sinon.spy()

    col.listen(mock)
    col.ignore(mock)

    col.pump()

    mock.should.not.have.been.called
  })

  it ('can render', function() {
    let col = new ColonelKurtz({
      el: document.createElement('div')
    })

    col.render()

    col.el.innerHTML.should.not.equal('')
  })

  describe("Deprecated APIs", function() {

    it ('supports addCallback', function(done) {
      let col = new ColonelKurtz({
        el: document.createElement('div')
      })

      col.addCallback(() => done())

      col.simulateChange()
    })

    it ('supports removeCallback', function() {
      let col = new ColonelKurtz({
        el: document.createElement('div')
      })

      let mock = sinon.spy()

      col.addCallback(mock)
      col.removeCallback(mock)

      col.simulateChange()

      mock.should.not.have.been.called
    })

    it ('throws an error if you try to addBlockTypes the old way', function(done) {
      try {
        ColonelKurtz.addBlockType()
      } catch(x) {
        done()
      }
    })

  })

})
