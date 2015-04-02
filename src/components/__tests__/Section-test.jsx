import Actions from 'actions/blocks'
import Block   from 'models/block'
import Colonel from '../../colonel'
import Section from '../Section'

describe('Components - Section', function() {
  let TestUtils = React.addons.TestUtils
  var app

  beforeEach(function(done) {
    app = new Colonel({
      el   : document.createElement('div'),
      seed : {
        system: { version: process.env.VERSION },
        blocks: [{
          content: {},
          type: 'section',
          blocks: [
            { content: {}, type: 'section' },
            { content: {}, type: 'section' }
          ]
        }]
      }
    })

    app.start(done)
  })

  it ('gets an editor for every child', function() {
    let block = app.pull('blocks')[0]
    let test  = TestUtils.renderIntoDocument(<Section app={ app } block={ block } { ...app.toObject() } />)

    test.getDOMNode().querySelectorAll('.col-block').length.should.equal(3)
  })

  it ('does not show an append button if it is marked as last and has no children', function() {
    let block = app.pull('blocks')[1]
    let test  = TestUtils.renderIntoDocument(<Section app={ app } block={ block } { ...app.toObject() } last />)

    test.refs.append.props.hide.should.equal(true)
  })

  it ('triggers an add action when append is clicked', function() {
    let block = app.pull('blocks')[0]
    let test  = TestUtils.renderIntoDocument(<Section app={ app } block={ block } { ...app.toObject() } />)

    sinon.spy(app, 'push')


    TestUtils.Simulate.click(test.refs.append.getDOMNode())

    app.push.should.have.been.called
  })

})
