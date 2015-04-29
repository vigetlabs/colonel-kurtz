import Actions   from 'actions/blocks'
import Menu      from 'components/Menu'
import React     from 'react'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getBlockType() {
    let { app, block } = this.props
    return app.refine('blockTypes').find(i => i.id === block.type)
  },

  render() {
    let { app, block, children } = this.props
    let { component:Component } = this.getBlockType()

    return (
      <div className={ `col-block col-block-${ block.type }`}>
        <Component ref="block" { ...block } onChange={ this._onChange } >
          { children }
        </Component>

        <Menu ref="menu" { ...this.props } items={ Component.menu } onSelect={ this._onSelect } />
      </div>
    )
  },

  _onChange(content) {
    let { app, block } = this.props
    app.push(Actions.update, block, content)
  },

  _onSelect(id) {
    let { block } = this.refs

    if ('menuWillSelect' in block) {
      block.menuWillSelect(id)
    }
  }

})
