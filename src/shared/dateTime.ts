/**
 * @Description: 日期时间-工具函数
 * @Example: import { Time } from '@/shared/time'
 * @Usage: new Time().format('YYYY-MM-DD HH:mm:ss.sss')
 * @Usage: new Time().firstDayOfMonth()
 * @Usage: new Time().firstDayOfYear()
 * @Usage: new Time().lastDayOfMonth()
 * @Usage: new Time().lastDayOfYear()
 * @Usage: new Time().add(1, 'month')
 * @Usage: new Time().subtract(1, 'month')
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-15 17:03:26
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-21 19:14:11
 * @FilePath: src/shared/dateTime.ts
 */
export class DateTime {
  readonly #date: Date = new Date()
  constructor(date = new Date()) {
    this.#date = date
  }
  format(pattern: string = 'YYYY-MM-DD') {
    // YYYY
    const year = this.#date.getFullYear()
    // MM
    const month = this.#date.getMonth() + 1
    // DD
    const day = this.#date.getDate()
    // HH
    const hour = this.#date.getHours()
    // mm
    const minute = this.#date.getMinutes()
    // ss
    const second = this.#date.getSeconds()
    // sss
    const millisecond = this.#date.getMilliseconds()
    return (
      pattern
        .replace(/YYYY/g, year.toString())
        // 使用 padStart 长度不足则补零
        .replace(/MM/g, month.toString().padStart(2, '0'))
        .replace(/DD/g, day.toString().padStart(2, '0'))
        .replace(/HH/g, hour.toString().padStart(2, '0'))
        .replace(/mm/g, minute.toString().padStart(2, '0'))
        .replace(/ss/g, second.toString().padStart(2, '0'))
        .replace(/sss/g, millisecond.toString().padStart(3, '0'))
    )
  }
  getOriginDate() {
    return new DateTime(this.#date)
  }
  firstDayOfMonth() {
    return new DateTime(new Date(this.#date.getFullYear(), this.#date.getMonth(), 1, 0, 0, 0))
  }
  firstDayOfYear() {
    return new DateTime(new Date(this.#date.getFullYear(), 0, 1, 0, 0, 0))
  }
  lastDayOfMonth() {
    return new DateTime(new Date(this.#date.getFullYear(), this.#date.getMonth() + 1, 0, 0, 0, 0))
  }
  lastDayOfYear() {
    return new DateTime(new Date(this.#date.getFullYear() + 1, 0, 0, 0, 0, 0))
  }
  getRawDate() {
    return this.#date // 'Thu Mar 02 2000 00:00:00 GMT+0800 (中国标准时间)'
  }
  add(
    amount: number,
    unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond',
  ) {
    const date = new Date(this.#date.getTime())
    switch (unit) {
      case 'year':
        // date.setFullYear(date.getFullYear() + amount)
        const currentDate = date.getDate()
        date.setDate(1)
        date.setFullYear(date.getFullYear() + amount)
        const targetDate = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0,
          0,
          0,
          0,
        ).getDate()
        date.setDate(Math.min(currentDate, targetDate))
        break
      case 'month':
        // date.setMonth(date.getMonth() + amount)
        // 01-31 + 1m = 02-28/29
        const currentDay = date.getDate() // 2000-01-31
        date.setDate(1) // 设置为 01-01，再加31天就不会跳到3月份去了，保证月份正确
        date.setMonth(date.getMonth() + amount) // 02-01
        // 获取 2000-03-00 00:00:00 的日期数字，其中 monthIndex 为 2
        const lastDayOfMonth = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0,
          0,
          0,
          0,
          0,
        ).getDate()
        date.setDate(Math.min(currentDay, lastDayOfMonth))
        break
      case 'week':
        date.setDate(date.getDate() + amount * 7)
        break
      case 'day':
        date.setDate(date.getDate() + amount)
        break
      case 'hour':
        date.setHours(date.getHours() + amount)
        break
      case 'minute':
        date.setMinutes(date.getMinutes() + amount)
        break
      case 'second':
        date.setSeconds(date.getSeconds() + amount)
        break
      case 'millisecond':
        date.setMilliseconds(date.getMilliseconds() + amount)
        break
      default:
        throw new Error(`Invalid unit: ${unit}`)
    }
    return new DateTime(date)
  }
  subtract(
    amount: number,
    unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond',
  ) {
    const date = new Date(this.#date.getTime())
    switch (unit) {
      case 'year':
        date.setFullYear(date.getFullYear() - amount)
        break
      case 'month':
        date.setMonth(date.getMonth() - amount)
        break
      case 'week':
        date.setDate(date.getDate() - amount * 7)
        break
      case 'day':
        date.setDate(date.getDate() - amount)
        break
      case 'hour':
        date.setHours(date.getHours() - amount)
        break
      case 'minute':
        date.setMinutes(date.getMinutes() - amount)
        break
      case 'second':
        date.setSeconds(date.getSeconds() - amount)
        break
      case 'millisecond':
        date.setMilliseconds(date.getMilliseconds() - amount)
        break
      default:
        throw new Error(`Invalid unit: ${unit}`)
    }
    return new DateTime(date)
  }
}
