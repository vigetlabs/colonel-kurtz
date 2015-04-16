import MenuItem from '../MenuItem'

describe('Components - MenuItem', function() {
  let TestUtils = React.addons.TestUtils

  it ('does not render if hidden', function() {
    let el = TestUtils.renderIntoDocument(
      <MenuItem label="test" onClick={ sinon.mock() } hide />
    )

    expect(el.getDOMNode()).to.equal(null)
  })

})
