import { get, set } from '../data'

describe('data', function() {
  describe('set', function() {
    const subject = {
      styles: {
        color: 'blue',
        font: 'Helvetica, sans-serif'
      }
    }

    it('can set a single key', function() {
      let next = set(subject, 'styles', false)

      expect(next.styles).toEqual(false)
    })

    it('can assign an empty path', function() {
      let value = set(subject, [], false)

      expect(value).toBe(false)
    })

    it('assigns undefined', function() {
      let next = set(subject, 'styles', undefined)

      expect(next.styles).toEqual(undefined)
    })

    it('can set a deep key', function() {
      let next = set(subject, ['styles', 'color'], 'red')

      expect(next.styles.color).toEqual('red')
    })

    it('can set a deep key using dot notation', function() {
      let next = set(subject, 'styles.color', 'red')

      expect(next.styles.color).toEqual('red')
    })

    it('can set new keys deeply', function() {
      let next = set(subject, ['styles', 'padding', 'top'], 10)

      expect(next.styles.padding.top).toEqual(10)
    })

    it('does not destructively update data', function() {
      let next = set(subject, ['styles', 'padding', 'top'], 10)

      expect(next).not.toBe(subject)
      expect(next.styles).not.toBe(subject.styles)
      expect(next.styles.padding).not.toBe(subject.styles.padding)
    })

    it('does not duplicate objects when the value is the same', function() {
      let next = set(subject, ['styles', 'color'], 'blue')

      expect(next).toBe(subject)
      expect(next.styles).toBe(subject.styles)
    })

    it('does modify the original value', function() {
      let next = set(subject, ['styles', 'color'], 'red')

      expect(subject.styles.color).toBe('blue')
      expect(next.styles.color).toBe('red')
    })

    it('assigns over an existing nested object', function() {
      let next = set({ root: true }, ['root', 'segment'], true)

      expect(next.root).toEqual({ segment: true })
    })

    describe('arrays', function() {
      it('can operate on arrays', function() {
        let list = ['a', 'b', 'c']
        let next = set(list, 3, 'd')

        expect(Array.isArray(next)).toBe(true)
        expect(next[3]).toBe('d')
      })

      it('properly assigns nested arrays', function() {
        let list = { a: ['b', 'c'] }
        let next = set(list, ['a', 1], 'd')

        expect(next).toEqual({ a: ['b', 'd'] })
        expect(next['a']).toBeInstanceOf(Array)
      })

      it('properly assigns nested arrays where keys are missing', function() {
        let space = { planets: [] }
        let next = set(space, ['planets', 0, 'color'], 'red')

        expect(next).toEqual({ planets: [{ color: 'red' }] })
        expect(next['planets']).toBeInstanceOf(Array)
        expect(next['planets'][0]).toEqual({ color: 'red' })
      })
    })
  })

  describe('get', function() {
    const subject = {
      styles: {
        color: 'blue',
        font: 'Helvetica, sans-serif'
      }
    }

    it('can retrieve a single key', function() {
      let styles = get(subject, 'styles')

      expect(styles).toEqual(subject.styles)
    })

    it('can retrieve a deep key path', function() {
      let color = get(subject, ['styles', 'color'])

      expect(color).toEqual(subject.styles.color)
    })

    it('returns a fallback if the key is undefined', function() {
      let padding = get(subject, ['styles', 'padding'], 10)

      expect(padding).toEqual(10)
    })

    it('returns the fallback if the object is null', function() {
      let fallback = get(null, ['missing'], true)

      expect(fallback).toBe(true)
    })

    it('returns the value if there is no fallback and the value is null', function() {
      let value = get({ prop: null }, 'prop')

      expect(value).toBe(null)
    })

    it('returns the value if there is no fallback and the value is undefined', function() {
      let value = get({ prop: undefined }, 'prop')

      expect(value).toBe(undefined)
    })

    it('returns the fallback if the key and fallback are null', function() {
      let fallback = get(null, null, true)

      expect(fallback).toBe(true)
    })

    it('returns the fallback if a mid-way key is null', function() {
      let fallback = get({ a: { b: null } }, 'a.b.c', true)

      expect(fallback).toBe(true)
    })
  })
})
