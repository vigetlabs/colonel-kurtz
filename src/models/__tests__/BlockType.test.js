import BlockType from '../BlockType'

describe('Models - BlockType', function () {
  it('serialize to an id', function () {
    let type = new BlockType({ id: 'fiz' })
    expect(type.valueOf()).toEqual(type.id)
  })

  it('has an infinite maxChildren attribute by default', function () {
    let type = new BlockType()
    expect(type.maxChildren).toEqual(Infinity)
  })
})
