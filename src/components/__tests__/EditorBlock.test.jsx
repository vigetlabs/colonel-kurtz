import Colonel     from '../../Colonel'
import EditorBlock from '../EditorBlock'
import TypeFixture from './fixtures/testBlockType'

describe('Components - EditorBlock', function() {
  let TestUtils = React.addons.TestUtils
  let el        = document.createElement('div')

  describe('when given a block with children', function() {
    let app;

    beforeEach(function(done) {
      app = new Colonel({
        el : el,
        blockTypes : [ TypeFixture ],
        blocks : [{
          type: TypeFixture.id,
          content: {},
          blocks: [
            { type: TypeFixture.id, content: {} },
            { type: TypeFixture.id, content: {} }
          ]
        }]
      })
      app.start(done)
    })

    it ('renders child blocks', function() {
      let component = TestUtils.renderIntoDocument(
        <EditorBlock app={ app } block={ app.refine('blocks').first() } />
      )

      component.refs.children.props.children.length.should.equal(2)
    })
  })
})
