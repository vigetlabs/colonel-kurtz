import Colonel from 'colonel'

describe('Stores - Block', function() {
  let app   = null
  let store = null

  beforeEach(function() {
    app = new Colonel({
      el: document.createElement('div')
    })

    store = app.stores.blocks
  })

  it ('can get all children for a specific block', function() {
    let parent = store._create({})
    let child  = store._create({ parent })

    store.childrenFor(parent).should.eql([ child ])
  })

  it ('can create a record', function(done) {
    app.actions.blocks.create({}).then(function() {
      store.all().length.should.equal(1)
      done()
    })
  })

  it ('can update a record', function(done) {
    let block = store._create({})

    app.actions.blocks.update(block.id, { fiz: true }).then(function() {
      block.content.fiz.should.equal(true)
      done()
    })
  })

  it ('can accept another block for the position field', function() {
    let first  = store._create({})
    let second = store._create({})
    let third  = store._create({ position: first })

    store._indexOf(third).should.equal(store._indexOf(first) + 1)
  })

  it ('can remove a record', function(done) {
    let block = store._create({})

    app.actions.blocks.destroy(block.id).then(function() {
      store.state.length.should.equal(0)
      done()
    })
  })

  it ('can move a record', function(done) {
    let a = store._create({})
    let b = store._create({})

    app.actions.blocks.move(a.id, b.id).then(function() {
      store._indexOf(a).should.equal(1)
      done()
    })
  })

  it ('removes children of a removed parent', function() {
    let parent = store._create({})
    let child  = store._create({ parent })
    let other  = store._create({})

    store._destroy(parent)
    store.all().length.should.equal(1)
  })

  it ('merges the content property', function() {
    let block = store._create({ content: { first: 'one' }})

    store._update({ id: block.id, content: { second: 'two' } })

    store.find(block.id).content.should.have.property('first', 'one')
    store.find(block.id).content.should.have.property('second', 'two')
  })

  it('can serialize to JSON', function() {
    let parent = store._create({ content: 'parent' })
    let child  = store._create({ parent, content: 'child' })
    let json   = store.serialize()

    json.length.should.equal(1)

    json[0].content.should.equal('parent')

    json[0].blocks.length.should.equal(1)
    json[0].blocks[0].content.should.equal('child')
  })

  it ('can deserialize JSON', function() {
    let json = store.deserialize([{
      type    : 'parent',
      content : 'parent',
      blocks: [{
        type    : 'child',
        content : 'child'
      }]
    }])

    store.state.length.should.equal(2)
  })

})
