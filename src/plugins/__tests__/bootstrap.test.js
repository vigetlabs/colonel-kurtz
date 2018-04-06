import Colonel from '../../Colonel'

describe('bootstrap plugin', function() {
  it('can serialize an input', function(done) {
    let input = document.createElement('textarea')

    input.value = JSON.stringify([
      {
        blocks: [],
        content: {},
        type: 'section'
      }
    ])

    let app = new Colonel({
      el: document.createElement('div'),
      blocks: input,
      blockTypes: [{ id: 'section' }]
    })

    app.start(function() {
      expect(app.state.blocks[0]).toHaveProperty('type', 'section')
      done()
    })
  })

  it('filter block types given a list', function(done) {
    let app = new Colonel({
      el: document.createElement('div'),
      allow: ['list'],
      blockTypes: [{ id: 'list' }, { id: 'text' }]
    })

    app.start(function() {
      let types = app.state.blockTypes

      expect(types).toHaveLength(1)
      expect(types[0]).toHaveProperty('id', 'list')

      done()
    })
  })

  it('allows all block types if given no allow option', function(done) {
    let app = new Colonel({
      el: document.createElement('div'),
      blockTypes: [{ id: 'list' }, { id: 'text' }]
    })

    app.start(function() {
      expect(app.state.blockTypes).toHaveLength(2)
      done()
    })
  })
})
