import Colonel from '../../Colonel'

describe('bootstrap plugin', function () {
  it('can serialize an input', function () {
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

    expect(app.state.blocks[0]).toHaveProperty('type', 'section')
  })

  it('filter block types given a list', function () {
    let app = new Colonel({
      el: document.createElement('div'),
      allow: ['list'],
      blockTypes: [{ id: 'list' }, { id: 'text' }]
    })

    let types = app.state.blockTypes
    expect(types).toHaveLength(1)
    expect(types[0]).toHaveProperty('id', 'list')
  })

  it('allows all block types if given no allow option', function () {
    let app = new Colonel({
      el: document.createElement('div'),
      blockTypes: [{ id: 'list' }, { id: 'text' }]
    })

    expect(app.state.blockTypes).toHaveLength(2)
  })
})
