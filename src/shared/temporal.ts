/**
 * @Description: 日期时间-Temporal 实现
 * @Example: import { DateTime } from '@/shared/temporal'
 * @Usage: new DateTime().format('YYYY-MM-DD HH:mm:ss.sss')
 * @Usage: new DateTime().firstDayOfMonth()
 * @Usage: new DateTime().firstDayOfYear()
 * @Usage: new DateTime().lastDayOfMonth()
 * @Usage: new DateTime().lastDayOfYear()
 * @Usage: new DateTime().add(1, 'month')
 * @Usage: new DateTime().subtract(1, 'month')
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-26 15:10:00
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-26 15:20:00
 * @FilePath: src/shared/temporal.ts
 */
import { Temporal, type TemporalTypes } from '@/polyfills/temporal.ts'

export type DateTimeUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'

export class DateTime {
  readonly #zoned: TemporalTypes.ZonedDateTime
  constructor(date = new Date()) {
    this.#zoned = Temporal.Instant.fromEpochMilliseconds(date.getTime()).toZonedDateTimeISO(
      Temporal.Now.timeZoneId(),
    )
  }
  format(pattern: string = 'YYYY-MM-DD') {
    const year = this.#zoned.year.toString()
    const month = this.#zoned.month.toString().padStart(2, '0')
    const day = this.#zoned.day.toString().padStart(2, '0')
    const hour = this.#zoned.hour.toString().padStart(2, '0')
    const minute = this.#zoned.minute.toString().padStart(2, '0')
    const second = this.#zoned.second.toString().padStart(2, '0')
    const millisecond = this.#zoned.millisecond.toString().padStart(3, '0')
    return pattern
      .replace(/YYYY/g, year)
      .replace(/MM/g, month)
      .replace(/DD/g, day)
      .replace(/HH/g, hour)
      .replace(/mm/g, minute)
      // 先替换 sss，避免 ss 把毫秒令牌吃掉
      .replace(/sss/g, millisecond)
      .replace(/ss/g, second)
  }
  getOriginDate() {
    return this.#fromZoned(this.#zoned)
  }
  firstDayOfMonth() {
    return this.#atStartOfDay({ day: 1 })
  }
  firstDayOfYear() {
    return this.#atStartOfDay({ month: 1, day: 1 })
  }
  lastDayOfMonth() {
    return this.#atStartOfDay({ day: this.#zoned.daysInMonth })
  }
  lastDayOfYear() {
    return this.#atStartOfDay({ month: 12, day: 31 })
  }
  getRawDate() {
    return new Date(this.#zoned.epochMilliseconds)
  }
  add(amount: number, unit: DateTimeUnit) {
    return this.#shift(amount, unit, 'add')
  }
  subtract(amount: number, unit: DateTimeUnit) {
    return this.#shift(amount, unit, 'subtract')
  }
  #shift(amount: number, unit: string, operation: 'add' | 'subtract') {
    const zoned = this.#zoned[operation](this.#duration(amount, unit), { overflow: 'constrain' })
    return this.#fromZoned(zoned)
  }
  #duration(amount: number, unit: string) {
    switch (unit) {
      case 'year':
        return { years: amount }
      case 'month':
        return { months: amount }
      case 'week':
        return { weeks: amount }
      case 'day':
        return { days: amount }
      case 'hour':
        return { hours: amount }
      case 'minute':
        return { minutes: amount }
      case 'second':
        return { seconds: amount }
      case 'millisecond':
        return { milliseconds: amount }
      default:
        throw new Error(`Invalid unit: ${unit}`)
    }
  }
  #fromZoned(zoned: TemporalTypes.ZonedDateTime) {
    return new DateTime(new Date(zoned.epochMilliseconds))
  }
  #atStartOfDay(fields: { month?: number, day?: number }) {
    return this.#fromZoned(this.#zoned.with({
      ...fields,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      microsecond: 0,
      nanosecond: 0,
    }))
  }
}
