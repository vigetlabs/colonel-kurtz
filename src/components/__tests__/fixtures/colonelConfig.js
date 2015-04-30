let Fixture = require('./testBlockType')

module.exports = {
  el: document.createElement('div'),
  blockTypes: [ Fixture ],
  blocks: [
    {
      type: Fixture.id,
      content: {},
      blocks: [
        { type: Fixture.id, content: {}, blocks: []},
        { type: Fixture.id, content: {}, blocks: []}
      ]
    },
    {
      type: Fixture.id,
      content: {},
      blocks: [
        { type: Fixture.id, content: {}, blocks: []},
        { type: Fixture.id, content: {}, blocks: []}
      ]
    }
  ]
}
