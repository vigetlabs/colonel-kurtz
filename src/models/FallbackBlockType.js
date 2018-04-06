/**
 * A fallback block type
 */

import BlockType from './BlockType'
import React from 'react'

export default class FallbackBlockType extends BlockType {
  constructor({ block }) {
    super({
      type: 'unsupported',
      component: FallBackBlock
    })
  }
}

class FallbackBlock extends React.Component {
  render() {
    return (
      <section className="col-unsupported">
        <header className="col-unsupported-header">
          <p className="col-unsupported-subtitle">Error</p>

          <p className="col-unsupported-title">
            Unrecognized block &ldquo;{block.type}&rdquo;
          </p>
        </header>

        <div className="col-unsupported-content">
          <p>
            This typically happens when a block type is removed, or the
            identifier changes.
          </p>
          <p>
            <b className="col-strong">Your content has not been lost!</b> Feel
            free to ignore this message, or build a new block with the
            information below:
          </p>
        </div>

        <pre className="col-unsupported-data">
          {JSON.stringify(block.content, null, 4)}
        </pre>
      </section>
    )
  }
}
