import insertAt from '../insertAt'

describe('Utils - insertAt', function () {
  let list = [1, 2, 3, 4, 5]

  it('can insert an item at a given position', function () {
    let result = insertAt(list, 'injection', 2)

    expect(result[2]).toEqual('injection')
  })

  it('appends to the end of the list of no position is provided', function () {
    let result = insertAt(list, 'injection')
    expect(result[result.length - 1]).toEqual('injection')
  })

  it('will not insert a position less than 0', function () {
    let result = insertAt(list, 'injection', -10)
    expect(result[0]).toEqual('injection')
  })

  it('will not insert a position greater than the list length', function () {
    let result = insertAt(list, 'injection', 40)

    expect(result[result.length - 1]).toEqual('injection')

    expect(result.length).toEqual(list.length + 1)
  })
})
