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

    bootstrap.register(app, { blocks: input, blockTypes: [] }, function() {
      app.refine('blocks').first().should.have.property('type', 'section')
      done()
    })

  })

})
