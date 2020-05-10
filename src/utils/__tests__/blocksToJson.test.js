import Block from '../../models/Block'
import blocksToJson from '../blocksToJson'

describe('Utils - blocksToJson', function () {
  it('serializes through children', function () {
    let parent = new Block({})
    let blocks = [parent, new Block({ parent }), new Block({ parent })]
    let result = blocksToJson(blocks)

    expect(result).toHaveLength(1)
    expect(result[0].blocks).toHaveLength(2)
  })

  it('does not include clientOnly flags', function () {
    let parent = new Block({})
    let blocks = [parent, new Block({ parent }), new Block({ parent })]
    let result = blocksToJson(blocks)

    expect(result).not.toHaveProperty('clientOnly')
  })

  it('just returns an empty object if no value is given', function () {
    expect(blocksToJson()).toHaveLength(0)
  })
})
