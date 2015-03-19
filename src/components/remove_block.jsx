import Button    from './ui/button'
import Strings   from 'constants/strings'
import React     from 'react'
import closeIcon from 'icons/close'

let RemoveBlock = React.createClass({

  contextTypes: {
    actions : React.PropTypes.object.isRequired
  },

  propTypes: {
    block : React.PropTypes.object.isRequired
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
    this.context.actions.blocks.destroy(this.props.block.id)
  }

})

export default RemoveBlock
