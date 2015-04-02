import Actions      from 'actions/blocks'
import Block        from 'components/Block'
import BlockMenu    from 'components/BlockMenu'
import Btn          from 'components/ui/Button'
import EditorBlock  from 'components/EditorBlock'
import React        from 'react'
import childrenOf   from 'utils/childrenOf'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired,
    last  : React.PropTypes.bool
  },

  getEditor(block) {
    return (<EditorBlock key={ block.id } app={ this.props.app } block={ block } />)
  },

  render() {
    let { app, block, last } = this.props

    let children   = app.pull('blocks', childrenOf, block)
    let noChildren = !children.length
    let shouldHide = last && noChildren

    return (
      <div>
        <Block app={ app } block={ block }>
          <BlockMenu app={ app } parent={ block } forceOpen={ noChildren } />
          { children.map(this.getEditor) }
        </Block>
        <Btn ref="append" className="col-btn-fab" hide={ shouldHide } onClick={ this._onAppend }>+</Btn>
      </div>
    )
  },

  _onAppend() {
    this.props.app.push(Actions.append, 'section')
  }

})
