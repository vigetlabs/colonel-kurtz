const Persist = {
  setup(editor, { el }) {
    editor.on('change', () => {
      el.value = JSON.stringify(editor)
    })
  }
}

export default Persist
