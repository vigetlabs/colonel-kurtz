const YouTube = require('../index')
const Simulate = React.addons.TestUtils.Simulate
const render = React.addons.TestUtils.renderIntoDocument

describe('YouTube', function() {

  it ('extracts codes from YouTube URLs', function(done) {
    const url  = 'https://www.youtube.com/watch?v=0bRLtJHo0pI'
    const test = function({ test }) {
      video_id.should.equal('0bRLtJHo0pI')
      done()
    }

    const component = render(<Embedded name="test" onChange={ test } />)

    component._onChange({ test: url })
  })

  it ('can process undefined values', function(done) {
    const test = function({ test }) {
      video_id.should.equal('')
      done()
    }

    const component = render(<Embedded name="test" onChange={ test } />)

    component._onChange({ test: undefined })
  })

})
