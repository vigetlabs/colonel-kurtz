/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

let Animator        = require('./Animator')
let Blocks          = require('../stores/Blocks')
let EditorBlock     = require('./EditorBlock')
let React           = require('react')
let Switch          = require('./Switch')
let InsertionPoint  = require('./InsertionPoint')
let DragDropContext = require('react-dnd').DragDropContext
let HTML5Backend    = require('react-dnd/modules/backends/HTML5')

var App = React.createClass({

  propTypes: {
    app : React.PropTypes.object.isRequired
  },

  getBlock(block, i) {
    return (<EditorBlock key={ block } app={ this.props.app } block={ block } />)
  },

  render() {
    let { app } = this.props

    let parents = Blocks.filterChildren(app.get('blocks'))

    return (
      <div className="colonel">
        <InsertionPoint app={ app } />
        <Animator className="col-block-children">
          { parents.map(this.getBlock) }
        </Animator>
      </div>
    )
  }

})

module.exports = DragDropContext(HTML5Backend)(App)
