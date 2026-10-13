import { describe, it, expect } from 'vitest'
import { scanSvgIcons, generateDtsContent, svgoStore } from '../svgoStore.ts'

describe('svgoStore plugin', () => {
  it('scans svg icons properly and uses filename as id/name', () => {
    const icons = scanSvgIcons('src/assets/icons', 'icon-[name]')
    expect(icons.length).toBeGreaterThan(0)
    const iconNames = icons.map((i) => i.name)
    expect(iconNames).toContain('add')
    expect(iconNames).toContain('mangosteen')
    expect(iconNames).toContain('pig')

    const iconAdd = icons.find((i) => i.name === 'add')
    expect(iconAdd?.id).toBe('icon-add')
  })

  it('generates DTS declaration content with enum and union type', () => {
    const icons = [
      { name: 'add', id: 'icon-add', filepath: '' },
      { name: 'chart', id: 'icon-chart', filepath: '' },
    ]
    const dts = generateDtsContent(icons, {
      enumName: 'SvgIconEnum',
      typeName: 'SvgIconName',
    })

    expect(dts).toContain('export enum SvgIconEnum')
    expect(dts).toContain("Add = 'add'")
    expect(dts).toContain("Chart = 'chart'")
    expect(dts).toContain("export type SvgIconName = 'add' | 'chart'")
    expect(dts).toContain("declare module '@svgoStore'")
  })

  it('provides virtual module resolve and load', () => {
    const plugin = svgoStore({
      inputFolder: 'src/assets/icons',
      symbolId: 'icon-[name]',
    })

    const resolveId = plugin.resolveId as (id: string) => string | null
    const load = plugin.load as (id: string) => string | null

    const resolved = resolveId('@svgoStore')
    expect(resolved).toBe('\0@svgoStore')

    const loaded = load('\0@svgoStore')
    expect(loaded).toContain('export const svgIconNames')
    expect(loaded).toContain('export const SvgIconEnum')
    expect(loaded).toContain('export const svgIconIds')
  })
})
