/**
 * ColonelKurtz Example
 */

import './example.scss'
import ColonelKurtz from '../src/Colonel'
import MediumBlock from '../addons/medium'
import HtmlEmbedBlock from '../addons/html-embed'
import ImageBlock from '../addons/image'
import YouTubeBlock from '../addons/youtube'
import SectionBlock from './blockTypes/Section'
import persist from './plugins/persist'

const blockTypes = [
  {
    id: 'section',
    label: 'Section',
    component: SectionBlock,
    types: ['child-text', 'image', 'youtube'],
    maxChildren: 3,
    root: true
  },
  {
    id: 'medium',
    label: 'Medium Editor',
    component: MediumBlock,
    group: 'Rich Text'
  },
  {
    id: 'embed',
    label: 'Embed',
    component: HtmlEmbedBlock
  },
  {
    id: 'child-text',
    label: 'Child Text',
    component: MediumBlock
  },
  {
    id: 'image',
    label: 'Image',
    group: 'Media',
    component: ImageBlock
  },
  {
    id: 'youtube',
    label: 'YouTube',
    group: 'Media',
    component: YouTubeBlock
  }
]

const editor = new ColonelKurtz({
  el: document.getElementById('app'),
  blockTypes: blockTypes,
  maxChildren: 5,
  maxDepth: 3
})

editor.addEffect(persist, { el: document.getElementById('output') })
