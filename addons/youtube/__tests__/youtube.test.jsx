const YouTube = require('../index')
const Simulate = React.addons.TestUtils.Simulate
const render = React.addons.TestUtils.renderIntoDocument

describe('Addons - YouTube', function() {

  it ('passes through slugs as a video_id content field', function(done) {
    const slug = '0bRLtJHo0pI'
    const test = function({ video_id }) {
      video_id.should.equal(slug)
      done()
    }

    const component = render(<YouTube onChange={ test } />)

    component._onChange({ video_id: slug })
  })

  it ('extracts codes from YouTube URLs', function(done) {
    const url  = 'https://www.youtube.com/watch?v=0bRLtJHo0pI'
    const test = function({ video_id }) {
      video_id.should.equal('0bRLtJHo0pI')
      done()
    }

    const component = render(<YouTube onChange={ test } />)

    component._onChange({ video_id: url })
  })

  it ('can process undefined values', function(done) {
    const test = function({ video_id }) {
      video_id.should.equal('')
      done()
    }

    const component = render(<YouTube onChange={ test } />)

    component._onChange({ video_id: undefined })
  })

})
