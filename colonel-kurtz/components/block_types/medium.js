/* @flow */

var React = require('react')
var Pure = require('mixins/pure')
var MediumEditor = require('vendor/medium-editor')

require('vendor/medium-editor/style')

var Medium = React.createClass({

  shouldComponentUpdate(props) {
    return props.content !== this.props.content
  },

  componentDidMount() {
    this.setState({
      editor: new MediumEditor(this.refs.editor.getDOMNode(), this.props.options)
    })
  },

  componentWillUnmount() {
    this.state.editor.deactivate()
  },

  render(): any {
    return (
      <div className="colonel-block-content">
        <div className="colonel-block-editor" role="textarea" aria-multiline="true" ref="editor" dangerouslySetInnerHTML={{ __html: this.props.content }} />
      </div>
    )
  }

})

module.exports = Medium
