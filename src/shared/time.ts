/**
 * @Description: 日期时间-工具函数
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-15 17:03:26
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-15 17:20:36
 * @FilePath: src/shared/time.ts
 */
export const time = (date?: Date) => {
  if(!date) {date = new Date()}
  // 目前支持的格式有 'YYYY-MM-DD HH:mm:ss.sss'
  const api = {
    format: (pattern: string = 'YYYY-MM-DD') => {
      // YYYY
      const year = date.getFullYear()
      // MM
      const month = date.getMonth() + 1
      // DD
      const day = date.getDate()
      // HH
      const hour = date.getHours()
      // mm
      const minute = date.getMinutes()
      // ss
      const second = date.getSeconds()
      // sss
      const millisecond = date.getMilliseconds()

      return pattern
        .replace(/YYYY/g, year.toString())
        // 使用 padStart 长度不足则补零
        .replace(/MM/g, month.toString().padStart(2, '0'))
        .replace(/DD/g, day.toString().padStart(2, '0'))
        .replace(/HH/g, hour.toString().padStart(2, '0'))
        .replace(/mm/g, minute.toString().padStart(2, '0'))
        .replace(/ss/g, second.toString().padStart(2, '0'))
        .replace(/sss/g, millisecond.toString().padStart(3, '0'))
    }
  }

  return {
    api,
  }
}
