/* @flow */

var Button = require('./ui/button')
var React  = require('react')

var AddBlock = React.createClass({

  contextTypes: {
    actions : React.PropTypes.object.isRequired
  },

  propTypes: {
    blockType: React.PropTypes.object.isRequired
  },

  render(): any {
    var { icon, id, label } = this.props.blockType

    return (
      <Button aria-label={ label } className="col-btn-icon" onClick={ this._onClick }>
        <img src={ icon } alt={ id } aria-hidden="true" />
      </Button>
    )
  },

  _onClick(e:Event): void {
    var { block, position, blockType } = this.props

    this.context.actions.blocks.create({
      parent : block,
      type   : blockType.id,
      position
    })

    e.preventDefault()
  }

})

module.exports = AddBlock
