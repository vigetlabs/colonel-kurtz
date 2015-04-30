module.exports = {
  id: 'test',
  label: 'Test',
  component: {
    statics: {
      menu: [{ id: 'test', label: 'Test' }]
    },
    render() {
      return <div>{ this.props.children }</div>
    }
  }
}
