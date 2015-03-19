/* @flow */

var Button = require('./ui/button')
var React  = require('react')

var AddBlock = React.createClass({

  propTypes: {
    blockType : React.PropTypes.object.isRequired,
    onAdd     : React.PropTypes.func.isRequired
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

    this.props.onAdd({
      parent : block,
      type   : blockType.id,
      position
    })

    e.preventDefault()
  }

})

module.exports = AddBlock
