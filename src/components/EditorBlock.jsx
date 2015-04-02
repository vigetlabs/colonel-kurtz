import Block     from 'components/Block'
import BlockMenu from 'components/BlockMenu'
import React     from 'react'

export default React.createClass({
  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  render() {
    let { app, block } = this.props

    return (
      <div>
        <Block app={ app } block={ block } />
        <BlockMenu app={ app } position={ block } parent={ block.parent } />
      </div>
    )
  }
})
