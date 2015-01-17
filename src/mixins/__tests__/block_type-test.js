import BlockType from 'mixins/block_type'

let Test = React.addons.TestUtils

describe('Mixin - BlockType', function() {
  let Component = React.createClass({
    mixins          : [BlockType],
    defaultContent  : () => { return { defaultContent: true }},
    renderEditor    : () => (<p>Editor</p>),
    renderPreviewer : () => (<p>Previewer</p>)
  })

  describe("when mixed into a component with an initialContent property", function() {
    it ("it sets the content state to initialContent", function() {
      let mounted = Test.renderIntoDocument(<Component initialContent={{ initial: true }} />)
      mounted.state.content.should.have.property('initial', true)
    })
  })

  describe("when mixed into a component without an initialContent property", function() {
    it ("calls defaultContent to set the initial content state", function() {
      let mounted = Test.renderIntoDocument(<Component />)
      mounted.state.content.should.have.property('defaultContent', true)
    })
  })

  describe("when mounted", function() {
    it ("renders EDIT_MODE by default", function() {
      let mounted = Test.renderIntoDocument(<Component />)
      mounted.getDOMNode().textContent.should.equal('Editor')
    })

    it ("renders PREVIEW_MODE when the mode is not EDIT_MODE", function() {
      let mounted = Test.renderIntoDocument(<Component mode="fiz" />)
      mounted.getDOMNode().textContent.should.equal('Previewer')
    })
  })

  describe("when updating content", function() {
    let mounted = Test.renderIntoDocument(<Component updateContent={ sinon.spy() }/>)

    it ("calls updateContent with the new state", function() {
      mounted.setContent({ newContent: true })
      mounted.props.updateContent.should.have.been.calledWith({ defaultContent: true, newContent: true})
    })
  })

})
