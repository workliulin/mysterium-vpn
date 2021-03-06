/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn" Authors.
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

import { describe, it, expect, beforeEach } from '../../../helpers/dependencies'
import { TimeFormatter } from '../../../../src/libraries/formatters/time-formatter'

describe('TimeFormatter', () => {
  let formatter: TimeFormatter

  beforeEach(() => {
    formatter = new TimeFormatter(-120)
  })

  describe('.getCurrentgetCurrentISODateTimegetCurrentISODateTimeDateTime', () => {
    it('returns a string representing current time', () => {
      const current = formatter.getCurrentISODateTime()

      expect(Date.parse(current)).to.not.be.NaN
      expect(Date.parse(current)).to.be.string
    })
  })

  describe('.formatISODateTime', () => {
    const datetime = new Date(Date.parse('04 Dec 1995 00:12:00 GMT'))

    it('returns ISO formatted string from datetime number', () => {
      expect(formatter.formatISODateTime(datetime)).to.eql('1995-12-04T00:12:00.000Z')
    })
  })

  describe('.formatTime', () => {
    it('returns readable time', () => {
      // -120
      const date = new Date(Date.UTC(2018, 8, 24, 14, 3, 55))
      expect(formatter.formatTime(date)).to.eql('16:03:55')
    })
  })

  describe('.formatDate', () => {
    it('returns readable date', () => {
      const date = new Date(2018, 8, 24, 14, 3, 55)
      expect(formatter.formatDate(date)).to.eql('24/09/2018')
    })
  })
})
