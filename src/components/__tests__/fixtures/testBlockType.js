module.exports = {
  id: 'test',
  label: 'Test',
  component: {
    getMenuItems() {
      return [{ id: 'test', label: 'Test' }]
    },
    render() {
      return <div>{ this.props.children }</div>
    }
  }
}
