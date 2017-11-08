let Btn   = require('../../src/components/Button')
let React = require('react')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      className : 'col-dialog-close',
      label     : 'Close this dialog',
      type      : 'button'
    }
  },

  render() {
    let { label, ...safe } = this.props

    return (
      <Btn { ...safe }>
        <span className="col-hidden">{ label }</span>
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </Btn>
    )
  }

})
