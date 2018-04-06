import React from 'react'
import Close from './close'
import FocusTrap from 'react-focus-trap'

function DialogTitle({ headingComponent, title }) {
  if (title) {
    return React.createElement(
      headingComponent,
      {
        className: 'col-dialog-title'
      },
      title
    )
  }

  return null
}

export default class Dialog extends React.Component {
  static defaultProps = {
    className: 'col-dialog',
    headingComponent: 'h3'
  }

  render() {
    const {
      active,
      headingComponent,
      title,
      children,
      className,
      onExit
    } = this.props

    return (
      <FocusTrap active={active} className={className} onExit={onExit}>
        <DialogTitle headingComponent={headingComponent} title={title} />
        {children}
        <Close onClick={onExit} />
      </FocusTrap>
    )
  }
}
