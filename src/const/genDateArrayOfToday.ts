/**
 * @Description: 生成今日日期数组
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-22 15:39:31
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 15:41:07
 * @FilePath: src/const/genDateArrayOfToday.ts
 */
export const genDateArrayOfToday = () => {
  const nowDate = new Date()
  return [`${nowDate.getFullYear()}`, `${nowDate.getMonth() + 1}`, `${nowDate.getDate()}`]
}
