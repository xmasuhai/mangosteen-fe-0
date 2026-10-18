/**
 * @Description: 帮助类型
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-18 12:51:08
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 12:51:43
 * @FilePath: src/types/helpers.d.ts
 */
// 获取数组项类型
type GetArrayItem<T> = T extends (infer U)[] ? U : never
type ArrayOf<T> = T extends Array<infer U> ? U : never;
