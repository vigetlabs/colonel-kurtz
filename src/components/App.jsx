/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

let Animator    = require('./Animator')
let Blocks      = require('../stores/Blocks')
let EditorBlock = require('./EditorBlock')
let React       = require('react')
let Switch      = require('./Switch')

module.exports = React.createClass({

  propTypes: {
    app : React.PropTypes.object.isRequired
  },

  getBlock(block, i) {
    return (<EditorBlock key={ block } app={ this.props.app } block={ block } />)
  },

  render() {
    let { app } = this.props

    let parents = Blocks.withoutChildren(app.get('blocks'))

    return (
      <div className="colonel">
        <Switch app={ app } />
        <Animator className="col-block-children">
          { parents.map(this.getBlock) }
        </Animator>
      </div>
    )
  }

})
