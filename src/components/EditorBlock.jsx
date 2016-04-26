let Block  = require('./Block')
let React  = require('react')
let Blocks = require('../stores/Blocks')

let EditorBlock = React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getBlock(block) {
    return (<EditorBlock key={ block } app={ this.props.app } block={ block } />)
  },

  render() {
    let { app, block } = this.props

    return (
      <Block app={ app } block={ block }>
        { Blocks.getChildren(app.state.blocks, block).map(this.getBlock) }
      </Block>
    )
  }

})

module.exports = EditorBlock
