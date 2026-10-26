/**
 * @Description: Temporal 特性检测。有原生实现则使用原生，否则安装 @js-temporal/polyfill。
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-26 15:10:00
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-26 15:10:00
 * @FilePath: src/polyfills/temporal.ts
 */
import { Temporal as PolyfillTemporal } from '@js-temporal/polyfill'

export type { Temporal as TemporalTypes } from '@js-temporal/polyfill'

type TemporalNamespace = typeof PolyfillTemporal

const runtimeGlobal = globalThis as typeof globalThis & {
  Temporal?: TemporalNamespace
}

const nativeTemporal = runtimeGlobal.Temporal

export const Temporal: TemporalNamespace = nativeTemporal ?? PolyfillTemporal

if (!nativeTemporal) {
  runtimeGlobal.Temporal = PolyfillTemporal
}
