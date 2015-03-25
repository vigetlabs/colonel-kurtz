import Button from './ui/button'
import React  from 'react'

var AddBlock = React.createClass({

  propTypes: {
    id    : React.PropTypes.string.isRequired,
    label : React.PropTypes.string.isRequired,
    onAdd : React.PropTypes.func.isRequired
  },

  render() {
    var { label } = this.props

    return (
      <Button onClick={ this._onClick }>{ this.props.label }</Button>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onAdd(this.props.id, this.props.block)
  }

})

export default AddBlock
