import React from 'react'
import YouTube from '../index'
import TestUtils from 'react-dom/test-utils'

const render = TestUtils.renderIntoDocument

describe('Addons - YouTube', function() {
  it('passes through slugs as a video_id content field', function(done) {
    const slug = '0bRLtJHo0pI'
    const test = function({ video_id }) {
      expect(video_id).toEqual(slug)
      done()
    }

    const component = render(<YouTube onChange={test} />)

    component._onChange({ video_id: slug })
  })

  it('can process undefined values', function(done) {
    const test = function({ video_id }) {
      expect(video_id).toEqual('')
      done()
    }

    const component = render(<YouTube onChange={test} />)

    component._onChange({ video_id: undefined })
  })

  describe('Extracting URLs', function() {
    const patterns = {
      shortcode: 'http://youtu.be/dQw4w9WgXcQ',
      embed: 'http://www.youtube.com/embed/dQw4w9WgXcQ',
      watch_query_string: 'http://www.youtube.com/watch?v=dQw4w9WgXcQ',
      query_string: 'http://www.youtube.com/?v=dQw4w9WgXcQ',
      v_url_parameter: 'http://www.youtube.com/v/dQw4w9WgXcQ',
      embed_url_parameter: 'http://www.youtube.com/e/dQw4w9WgXcQ',
      user_hash: 'http://www.youtube.com/user/username#p/u/11/dQw4w9WgXcQ',
      org_hash:
        'http://www.youtube.com/sandalsResorts#p/c/54B8C800269D7C1B/0/dQw4w9WgXcQ',
      watch_extra_query_parameters:
        'http://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ',
      extra_query_parameters:
        'http://www.youtube.com/?feature=player_embedded&v=dQw4w9WgXcQ'
    }

    for (let pattern in patterns) {
      it(`extracts the video id from a YouTube ${pattern.replace(
        '_',
        ' '
      )}`, function(done) {
        const url = patterns[pattern]
        const test = function({ video_id }) {
          expect(video_id).toEqual('dQw4w9WgXcQ')
          done()
        }

        const component = render(<YouTube onChange={test} />)

        component._onChange({ video_id: url })
      })
    }
  })
})
