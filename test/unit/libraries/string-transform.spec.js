/*
 * Copyright (C) 2018 The "MysteriumNetwork/mysterion" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// @flow

import { describe, it, expect } from '../../helpers/dependencies'
import { applyTransformation, filterByString, prependWith } from '../../../src/libraries/string-transform'

describe('prependWith', () => {
  it('constructs function that prepends', () => {
    expect(prependWith('pre')('data')).to.eql('predata')
  })
})

describe('filterByString', () => {
  describe('constructs function that returns strings', () => {
    it('same string if filter matches', () => {
      expect(filterByString('a')('bald')).to.eql('bald')
    })
    it('returns nothing if filter doesn\'t match', () => {
      expect(filterByString('a')('bold')).to.be.undefined
    })
  })
})

describe('applyTransformation', () => {
  let called
  const transformFn = (data) => {
    called = true
    return data + '+'
  }
  const cb = (data) => {
    expect(called).to.be.true
    expect(data).to.eql('data+')
  }

  it('runs transformation function and pipes its output to callback', () => {
    applyTransformation(transformFn, cb)('data')
  })
})
