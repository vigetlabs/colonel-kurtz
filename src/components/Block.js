import React from 'react'
import Actions from '../actions/blocks'
import Animator from './Animator'
import BlockMenu from './BlockMenu'
import FallbackBlockType from '../models/FallbackBlockType'
import Switch from './Switch'
import respondsTo from '../utils/respondsTo'
import { assign } from '../utils/data'

export default class Block extends React.PureComponent {
  constructor() {
    super(...arguments)

    this.state = {
      extraMenuItems: [],
      menuOpen: false
    }
  }

  getBlockType() {
    let { app, block } = this.props

    let blockType = app.state.blockTypes.filter(i => i.id === block.type)[0]

    return blockType ? blockType : new FallbackBlockType({ block })
  }

  getMenuItems() {
    return this.state.extraMenuItems
  }

  setMenuItems(component) {
    if (respondsTo(component, 'getMenuItems')) {
      this.setState({ extraMenuItems: component.getMenuItems() })
    }
  }

  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  componentDidMount() {
    this.setMenuItems(this.block)

    // Trigger an initial change to ensure default content
    // is assigned immediately
    this._onChange(this.getContent(this.props.block))
  }

  getContent(block) {
    let { component } = this.getBlockType()

    let defaults = component.defaultProps || {}

    return assign({}, defaults.content, block.content)
  }

  getBlockOptions(block) {
    return this.getBlockType()['options'] || {}
  }

  render() {
    let { app, block, children } = this.props
    let { component: Component } = this.getBlockType()
    let { menuOpen, extraMenuItems } = this.state
    let options = this.getBlockOptions(block)

    // Determine content by taking the default content and extend it with
    // the current block content
    let content = this.getContent(block)

    return (
      <div className="col-editor-block">
        <div className={`col-block col-block-${block.type}`}>
          <Component
            ref={el => (this.block = el)}
            {...block}
            {...options}
            content={content}
            onChange={this._onChange.bind(this)}
          >
            <Switch app={app} parent={block} />
            <Animator className="col-block-children">{children}</Animator>
          </Component>

          <BlockMenu
            ref={el => (this.menu = el)}
            app={app}
            block={block}
            items={extraMenuItems}
            active={menuOpen}
            onOpen={this.openMenu.bind(this)}
            onExit={this.closeMenu.bind(this)}
          />
        </div>

        <Switch app={app} position={block} parent={block.parent} />
      </div>
    )
  }

  _onChange(keypath, value) {
    let { app, block } = this.props

    if (typeof keypath === 'object') {
      // onChange({ field: 'value' })
      app.push(Actions.update, [block, keypath])
    } else {
      // onChange('field', 'value')
      // onChange('deep.field', 'value')
      app.push(Actions.set, [block, keypath, value])
    }
  }
}
