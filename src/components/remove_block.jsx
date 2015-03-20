import Button    from './ui/button'
import Strings   from 'constants/strings'
import React     from 'react'
import closeIcon from 'icons/more'

let RemoveBlock = React.createClass({

  propTypes: {
    block     : React.PropTypes.object.isRequired,
    onDestroy : React.PropTypes.func.isRequired
  },

  render() {
    return (
      <Button aria-label={ Strings.remove } className="col-btn-remove" onClick={ this._onClick }>
        <span dangerouslySetInnerHTML={{ __html: `${ closeIcon }` }} />
      </Button>
    )
  },

  _onClick(e: Event) {
    e.preventDefault();
    this.props.onDestroy(this.props.block.id)
  }

})

export default RemoveBlock
