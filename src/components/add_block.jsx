import Button from './ui/button'
import React  from 'react'

var AddBlock = React.createClass({

  propTypes: {
    icon  : React.PropTypes.string.isRequired,
    id    : React.PropTypes.string.isRequired,
    label : React.PropTypes.string.isRequired,
    onAdd : React.PropTypes.func.isRequired
  },

  render() {
    var { icon, id, label } = this.props

    return (
      <Button aria-label={ label } className="col-btn-icon" onClick={ this._onClick }>
        <img src={ icon } alt={ id } aria-hidden="true" />
      </Button>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onAdd(this.props.id, this.props.block)
  }

})

export default AddBlock
