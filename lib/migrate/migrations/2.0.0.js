module.exports = {
  version: '2.0.0',

  // 2.0.0 adds a sections block type that wraps around all other
  // types. It also adds a system object
  up: function (state) {
    return {
      system: { version: '2.0.0' },
      blocks: Array.isArray(state) ? [{
        blocks  : state,
        content : {},
        type    : 'section'
      }] : []
    }
  },

  // Prior to this version, colonel kurts has no concept of sections.
  // To protect data, all top level blocks are flattened to only their
  // child parts.
  //
  // Additionally, versions of colonel prior to this version
  // do not keep track of versions
  down: function (state) {
    var blocks = state.blocks || []

    return blocks.reduce(function(memo, record) {
      return memo.concat(record.blocks)
    }, [])
  }
}
