import App from '../app'
import ColonelKurtz from 'colonel'

let TestUtils = React.addons.TestUtils

describe('Components - App', function() {

  it ('can render when given an editor id', function() {
    let app = new ColonelKurtz({
      el: document.createElement('div')
    })

    let component = TestUtils.renderIntoDocument(<App editorId={ app.id } />)
  })
})
