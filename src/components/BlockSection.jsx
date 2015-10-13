let React          = require('react')
let Block          = require('./Block')
let InsertionPoint = require('./InsertionPoint')

var BlockSection = React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  render() {
    let { app, block, children } = this.props

    return (
      <div className="col-editor-block">
        <Block app={app} block={ block } children={ children } />
        <InsertionPoint app={ app } preceedingBlock={ block } containingBlock={ block.parent } />
      </div>
    )
  }

})

module.exports = BlockSection
