import React from 'react'
import Close from './close'
import FocusTrap from 'react-focus-trap'

const defaultProps = {
  className: 'col-dialog',
  headingComponent: 'h3'
}

export default class Dialog extends React.Component {
  renderTitle() {
    const { headingComponent: Title, title } = this.props

    return title ? <Title className="col-dialog-title">{title}</Title> : null
  }

  render() {
    const { active, children, className, onExit } = this.props

    return (
      <FocusTrap active={active} className={className} onExit={onExit}>
        {this.renderTitle()}
        {children}
        <Close onClick={onExit} />
      </FocusTrap>
    )
  }
}

Dialog.defaultProps = defaultProps
