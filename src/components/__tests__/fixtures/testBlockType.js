module.exports = {
  id    : 'test',
  label : 'Test',
  component: {
    getDefaultProps() {
      return {
        content: {
          text: 'Test'
        }
      }
    },
    getMenuItems() {
      return [{ id: 'test', label: 'Test' }]
    },
    render() {
      return <div>{ this.props.children }</div>
    }
  }
}
