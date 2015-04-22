import Animation from 'react/lib/ReactCSSTransitionGroup'
import Block     from 'components/Block'
import Switch    from 'components/Switch'
import React     from 'react'

let EditorBlock = React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getBlock(block, i) {
    return (<EditorBlock key={ block.id }
                         app={ this.props.app }
                         block={ block } />)
  },

  render() {
    let { app, block } = this.props

    let children = app.refine('blocks')
                      .filter(i => i.parent === block)

    return (
      <div className="col-editor-block">
        <Block app={ app } block={ block }>
          <Switch app={ app } parent={ block } />
          <Animation transitionName="col-editor-block">
            { children.map(this.getBlock) }
          </Animation>
        </Block>
        <Switch app={ app } position={ block } parent={ block.parent } />
      </div>
    )
  }

})

export default EditorBlock
