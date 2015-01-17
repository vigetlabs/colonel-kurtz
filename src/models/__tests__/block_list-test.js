import BlockList from 'models/block_list'

describe('Models - Block List', function() {

  it ('can insert a block', function() {
    let b = new BlockList({})

    b.insertBlock(0, 0)

    b.all().should.eql([ 0 ])
  })

  it ('can insert a block at a given index', function() {
    let b = new BlockList({})

    b.insertBlock(0, 1)
    b.insertBlock(1, 0)

    b.all().should.eql([ 1, 0])
  })

  it ('can remove a block', function() {
    let b = new BlockList({})

    b.insertBlock(0, 0)
    b.insertBlock(1, 1)
    b.removeBlock(1)

    b.all().should.eql([ 0 ])
  })

  it ('can move a block', function() {
    let b = new BlockList({})

    b.insertBlock(0, 0)
    b.insertBlock(1, 1)
    b.move(1, 0)

    b.all().should.eql([ 1, 0 ])
  })

})
