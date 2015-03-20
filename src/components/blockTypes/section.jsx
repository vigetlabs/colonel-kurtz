import React from 'react'

let Section = React.createClass({

  getDefaultProps() {
    return {
      content : {}
    }
  },

  render() {
    return (
      <section className="col-section">
        { this.props.children }
      </section>
    )
  }

})

export default Section
