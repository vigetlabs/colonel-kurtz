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

const blockTypes = [
  {
    id: 'section',
    label: 'Section',
    component: SectionBlock,
    types: ['child-text', 'image', 'youtube', 'section'],
    maxChildren: 3
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
    component: MediumBlock,
    root: false
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

let editor = new ColonelKurtz({
  el: document.getElementById('app'),
  blockTypes: blockTypes,
  blockTypesData: {
    youtube: {
      name: 'Chris'
    }
  },
  maxChildren: 5,
  maxDepth: 3
})

editor.start()
