let Colonel   = require('../../Colonel')
let bootstrap = require('../bootstrap')

describe('bootstrap plugin', function() {

  it ('can serialize an input', function(done) {
    let app   = new Colonel({ el: document.createElement('div') })
    let input = document.createElement('textarea')

    input.value = JSON.stringify([{
      blocks  : [],
      content : {},
      type    : 'section'
    }])

    let blockTypes = [{ id: 'section' }]

    bootstrap.register(app, { blocks: input, blockTypes }, function() {
      app.refine('blocks').first().should.have.property('type', 'section')
      done()
    })
  })

  it ('filter block types given a list', function(done) {
    let app = new Colonel({ el : document.createElement('div') })

    bootstrap.register(app, {
      allow: [ 'list' ],
      blockTypes : [{ id: 'list' }, { id: 'text' }]
    }, function() {
      let types = app.refine('blockTypes')

      types.size().should.equal(1)
      types.first().id.should.equal('list')

      done()
    })
  })

  it ('allows all block types if given no allow option', function(done) {
    let app = new Colonel({ el : document.createElement('div') })

    bootstrap.register(app, {
      blockTypes : [{ id: 'list' }, { id: 'text' }]
    }, function() {
      app.refine('blockTypes').size().should.equal(2)
      done()
    })
  })

  it ('filters out blocks which have a type not passed in to blockTypes', function(done) {
    let app   = new Colonel({ el : document.createElement('div') })
    let input = document.createElement('textarea')

    input.value = JSON.stringify([
      {
        blocks  : [],
        content : {},
        type    : 'list'
      },
      {
        blocks  : [],
        content : {},
        type    : 'section'
      }
    ])

    bootstrap.register(app, {
      blocks     : input,
      blockTypes : [{ id: 'list' }]
    }, function() {
      let blocks = app.refine('blocks')

      blocks.size().should.equal(1)
      blocks.first().type.should.equal('list')

      done()
    })
  })

  it ('filters out children blocks which have a type not passed in to blockTypes', function(done) {
    let app   = new Colonel({ el : document.createElement('div') })
    let input = document.createElement('textarea')

    input.value = JSON.stringify([
      {
        content : {},
        type    : 'list',
        blocks  : [
          {
            blocks  : [],
            content : {},
            type    : 'text'
          },
          {
            blocks  : [],
            content : {},
            type    : 'alien'
          }
        ]
      }
    ])

    bootstrap.register(app, {
      blocks     : input,
      blockTypes : [{ id: 'list' }, { id: 'text' }]
    }, function() {
      let blocks = app._state.blocks

      blocks.length.should.equal(2)
      blocks[0].type.should.equal('list')
      blocks[1].type.should.equal('text')

      done()
    })
  })
})
