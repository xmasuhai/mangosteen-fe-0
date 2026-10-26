import { describe, expect, it } from 'vitest'
import { DateTime as LegacyDateTime } from '../dateTime.ts'
import { DateTime, type DateTimeUnit } from '../temporal.ts'

describe('Temporal polyfill', () => {
  it('exposes ZonedDateTime after setup', () => {
    const temporal = (globalThis as { Temporal?: { ZonedDateTime?: unknown } }).Temporal
    expect(temporal?.ZonedDateTime).toBeTruthy()
  })
})

describe('Temporal DateTime format and boundaries', () => {
  const leapDay = new Date(2000, 1, 29, 15, 4, 5, 6)
  const commonFebruary = new Date(2001, 1, 10, 8, 9, 7, 42)
  const padded = new Date(2001, 0, 2, 3, 4, 5, 6)

  it('formats the default pattern and matches the legacy class', () => {
    expect(new DateTime(leapDay).format()).toBe('2000-02-29')
    expect(new DateTime(leapDay).format()).toBe(new LegacyDateTime(leapDay).format())
    expect(new DateTime(padded).format('YYYY-MM-DD HH:mm')).toBe(
      new LegacyDateTime(padded).format('YYYY-MM-DD HH:mm'),
    )
  })

  it('keeps a 3-digit millisecond token after the seconds', () => {
    expect(new DateTime(leapDay).format('YYYY-MM-DD HH:mm:ss.sss')).toBe('2000-02-29 15:04:05.006')
    expect(new DateTime(padded).format('YYYY-MM-DD HH:mm:ss.sss')).toBe('2001-01-02 03:04:05.006')
  })

  it('returns month and year boundaries at local midnight, including leap and common Februaries', () => {
    const cases = [
      { date: leapDay, method: 'lastDayOfMonth', expected: '2000-02-29' },
      { date: commonFebruary, method: 'lastDayOfMonth', expected: '2001-02-28' },
      { date: leapDay, method: 'firstDayOfMonth', expected: '2000-02-01' },
      { date: leapDay, method: 'firstDayOfYear', expected: '2000-01-01' },
      { date: leapDay, method: 'lastDayOfYear', expected: '2000-12-31' },
    ] as const

    for (const { date, method, expected } of cases) {
      const next = new DateTime(date)[method]()
      expect(next.format()).toBe(expected)
      expect(next.format()).toBe(new LegacyDateTime(date)[method]().format())
      expect(next.format('YYYY-MM-DD HH:mm:ss.sss')).toBe(`${expected} 00:00:00.000`)
      expect(next).not.toBe(new DateTime(date))
    }
  })

  it('copies the original instant without sharing the input Date', () => {
    const date = new Date(leapDay.getTime())
    const datetime = new DateTime(date)

    expect(datetime.getRawDate().getTime()).toBe(date.getTime())
    expect(datetime.getRawDate()).not.toBe(date)
    expect(datetime.getOriginDate()).not.toBe(datetime)
    expect(datetime.getOriginDate().format('YYYY-MM-DD HH:mm:ss.sss')).toBe(
      datetime.format('YYYY-MM-DD HH:mm:ss.sss'),
    )

    date.setFullYear(1999)
    expect(datetime.format()).toBe('2000-02-29')
    expect(datetime.format('YYYY-MM-DD HH:mm:ss.sss')).toBe('2000-02-29 15:04:05.006')
  })
})

describe('Temporal DateTime arithmetic', () => {
  const pattern = 'YYYY-MM-DD HH:mm:ss.sss'
  const jan31Leap = new Date(2000, 0, 31, 23, 59, 58, 7)
  const jan31Common = new Date(2001, 0, 31, 1, 2, 3, 4)
  const leapDay = new Date(2024, 1, 29, 12, 30, 0, 0)
  const march31 = new Date(2001, 2, 31, 8, 9, 10, 11)
  const clock = new Date(2001, 2, 15, 10, 20, 30, 40)

  it('clamps month and year addition the same way as the legacy class', () => {
    expect(new DateTime(jan31Leap).add(1, 'month').format(pattern)).toBe('2000-02-29 23:59:58.007')
    expect(new DateTime(jan31Common).add(1, 'month').format(pattern)).toBe('2001-02-28 01:02:03.004')
    expect(new DateTime(leapDay).add(1, 'year').format(pattern)).toBe('2025-02-28 12:30:00.000')

    const dates = [jan31Leap, jan31Common, leapDay, clock]
    const units: DateTimeUnit[] = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond']
    for (const date of dates) {
      for (const unit of units) {
        for (const amount of [0, 1, -1, 2]) {
          expect(new DateTime(date).add(amount, unit).getRawDate().getTime()).toBe(
            new LegacyDateTime(date).add(amount, unit).getRawDate().getTime(),
          )
        }
      }
    }
  })

  it('clamps month and year subtraction instead of overflowing into the next month', () => {
    expect(new DateTime(march31).subtract(1, 'month').format(pattern)).toBe('2001-02-28 08:09:10.011')
    expect(new DateTime(leapDay).subtract(1, 'year').format(pattern)).toBe('2023-02-28 12:30:00.000')
    expect(new DateTime(leapDay).add(-1, 'year').format(pattern)).toBe(
      new DateTime(leapDay).subtract(1, 'year').format(pattern),
    )
    expect(new DateTime(march31).add(-1, 'month').format(pattern)).toBe(
      new DateTime(march31).subtract(1, 'month').format(pattern),
    )
  })

  it('adds and subtracts weeks, days, and clock units without changing the original', () => {
    const datetime = new DateTime(clock)
    const before = datetime.format(pattern)
    const timeUnits: DateTimeUnit[] = ['week', 'day', 'hour', 'minute', 'second', 'millisecond']

    expect(datetime.add(2, 'week').format(pattern)).toBe('2001-03-29 10:20:30.040')
    expect(datetime.subtract(1, 'week').format(pattern)).toBe('2001-03-08 10:20:30.040')
    expect(datetime.add(3, 'day').format(pattern)).toBe('2001-03-18 10:20:30.040')
    expect(datetime.subtract(1, 'day').format(pattern)).toBe('2001-03-14 10:20:30.040')
    expect(datetime.add(5, 'hour').format(pattern)).toBe('2001-03-15 15:20:30.040')
    expect(datetime.subtract(2, 'hour').format(pattern)).toBe('2001-03-15 08:20:30.040')
    expect(datetime.add(15, 'minute').format(pattern)).toBe('2001-03-15 10:35:30.040')
    expect(datetime.subtract(30, 'minute').format(pattern)).toBe('2001-03-15 09:50:30.040')
    expect(datetime.add(40, 'second').format(pattern)).toBe('2001-03-15 10:21:10.040')
    expect(datetime.subtract(50, 'second').format(pattern)).toBe('2001-03-15 10:19:40.040')
    expect(datetime.add(20, 'millisecond').format(pattern)).toBe('2001-03-15 10:20:30.060')
    expect(datetime.subtract(50, 'millisecond').format(pattern)).toBe('2001-03-15 10:20:29.990')

    for (const unit of timeUnits) {
      for (const amount of [0, 1, -1, 3]) {
        expect(datetime.add(amount, unit).getRawDate().getTime()).toBe(
          new LegacyDateTime(clock).add(amount, unit).getRawDate().getTime(),
        )
        expect(datetime.subtract(amount, unit).getRawDate().getTime()).toBe(
          new LegacyDateTime(clock).subtract(amount, unit).getRawDate().getTime(),
        )
      }
    }

    expect(datetime.add(0, 'month').format(pattern)).toBe(before)
    expect(datetime.subtract(0, 'year').format(pattern)).toBe(before)
    expect(datetime.add(1, 'day')).not.toBe(datetime)
    expect(datetime.format(pattern)).toBe(before)
  })

  it('rejects unknown units and ignores mutations of the raw Date', () => {
    const datetime = new DateTime(jan31Leap)
    const raw = datetime.getRawDate()
    raw.setFullYear(1990)

    expect(datetime.format(pattern)).toBe('2000-01-31 23:59:58.007')
    expect(() => datetime.add(1, 'fortnight' as DateTimeUnit)).toThrowError('Invalid unit: fortnight')
    expect(() => datetime.subtract(2, 'quarter' as DateTimeUnit)).toThrowError('Invalid unit: quarter')
  })
})
