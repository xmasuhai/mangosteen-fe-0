/**
 * @Description: 生成今日日期数组
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-22 15:39:31
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 16:31:01
 * @FilePath: src/const/genDateArray.ts
 */
export const genDateArray = (defaultDateStr: Date = new Date()) => [
  `${defaultDateStr.getFullYear()}`,
  `${defaultDateStr.getMonth() + 1}`,
  `${defaultDateStr.getDate()}`,
]
