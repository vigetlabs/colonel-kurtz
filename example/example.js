/**
 * ColonelKurtz Example
 */

import './example.scss'
import React from 'react'
import ColonelKurtz from '../src/Colonel'
import MediumBlock from '../addons/medium'
import HtmlEmbedBlock from '../addons/html-embed'
import ImageBlock from '../addons/image'
import YouTubeBlock from '../addons/youtube'
import SectionBlock from './blockTypes/Section'
import Field from '../addons/common/field'

let el = document.getElementById('app')

let editor = new ColonelKurtz({
  types: {
    string: props => {
      return (
        <Field type="string" label={props.title} hint={props.description} />
      )
    },
    array: props => {
      return (
        <div>
          <header>Children</header>
          <p>Not supported yet</p>
        </div>
      )
    }
  },
  structure: [
    {
      id: 'hero',
      title: 'Hero',
      type: 'object', // Right now, this is assumed to be the default type

      properties: {
        title: {
          title: 'Title',
          type: 'string',
          description: 'The main heading.'
        },
        subtitle: {
          title: 'Subtitle',
          type: 'string',
          description: 'Secondary text below the heading.'
        },
        children: {
          type: 'array',
          items: [
            {
              title: 'graphic',
              type: 'object',
              properties: {
                url: {
                  title: 'Image Url',
                  type: 'string',
                  description: 'Graphic url'
                },
                title: {
                  title: 'Title',
                  type: 'string',
                  description: 'Title of graphic'
                }
              }
            }
          ]
        }
      }
    }
  ]
})

editor.render(el)
