import fs from 'node:fs'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { scanSvgIcons, generateDtsContent, svgoStore } from '../svgoStore.ts'

const temporaryDirectories: string[] = []

function createIconDirectory(icons: Record<string, string> = {}) {
  const temporaryDirectory = fs.mkdtempSync(
    path.join(process.cwd(), 'node_modules', '.tmp', 'svgoStore-test-'),
  )
  const inputFolder = path.join(temporaryDirectory, 'icons')
  fs.mkdirSync(inputFolder, { recursive: true })
  temporaryDirectories.push(temporaryDirectory)

  for (const [name, content] of Object.entries(icons)) {
    fs.writeFileSync(path.join(inputFolder, `${name}.svg`), content, 'utf-8')
  }

  return { temporaryDirectory, inputFolder }
}

function createFakeServer() {
  const listeners = new Map<string, (file: string) => void>()
  const invalidatedModules: unknown[] = []
  const moduleIds = [
    '\0@svgoStore',
    '\0virtual:svgoStore',
    '\0virtual:svg-icons/names',
    '\0virtual:svg-icons/ids',
  ]

  return {
    listeners,
    invalidatedModules,
    watcher: {
      add: (directory: string) => directory,
      on: (event: string, listener: (file: string) => void) => {
        listeners.set(event, listener)
      },
    },
    moduleGraph: {
      getModuleById: (id: string) => (moduleIds.includes(id) ? { id } : undefined),
      invalidateModule: (module: unknown) => invalidatedModules.push(module),
    },
    ws: {
      send: () => undefined,
    },
  }
}

function getHook<T extends (...args: never[]) => unknown>(plugin: ReturnType<typeof svgoStore>, name: string) {
  return plugin[name as keyof typeof plugin] as T
}

afterEach(() => {
  for (const temporaryDirectory of temporaryDirectories.splice(0)) {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true })
  }
})

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

  it('resolves every supported module name and ignores unknown names', () => {
    const plugin = svgoStore()
    const resolveId = getHook<(id: string) => string | null>(plugin, 'resolveId')

    expect(resolveId('@svgoStore')).toBe('\0@svgoStore')
    expect(resolveId('svg_bundle.ts')).toBe('\0@svgoStore')
    expect(resolveId('virtual:svgoStore')).toBe('\0virtual:svgoStore')
    expect(resolveId('virtual:svg-icons/names')).toBe('\0virtual:svg-icons/names')
    expect(resolveId('virtual:svg-icons/ids')).toBe('\0virtual:svg-icons/ids')
    expect(resolveId('virtual:unknown')).toBeNull()
    expect(resolveId('toString')).toBeNull()
  })

  it('loads icon names and ids, applying the configured symbol pattern', () => {
    const { inputFolder } = createIconDirectory({
      add: '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>',
      chart: '<svg xmlns="http://www.w3.org/2000/svg"><circle r="1"/></svg>',
    })
    const plugin = svgoStore({ inputFolder, symbolId: 'custom-[name]-symbol' })
    const load = getHook<(id: string) => string | null>(plugin, 'load')

    expect(load('\0virtual:svg-icons/names')).toBe('export default ["add","chart"]')
    expect(load('\0virtual:svg-icons/ids')).toBe(
      'export default ["custom-add-symbol","custom-chart-symbol"]',
    )
    expect(load('\0missing-module')).toBeNull()
    expect(load('toString')).toBeNull()
  })

  it('supports empty icon folders and custom exported type names', () => {
    const { inputFolder } = createIconDirectory()
    const plugin = svgoStore({
      inputFolder,
      enumName: 'MyIcons',
      typeName: 'MyIconName',
    })
    const load = getHook<(id: string) => string | null>(plugin, 'load')
    const declaration = generateDtsContent([], {
      enumName: 'MyIcons',
      typeName: 'MyIconName',
    })

    expect(load('\0virtual:svg-icons/names')).toBe('export default []')
    expect(load('\0virtual:svg-icons/ids')).toBe('export default []')
    expect(declaration).toContain('export enum MyIcons')
    expect(declaration).toContain('export type MyIconName = string')
    expect(declaration).toContain('export type MyIconNames = MyIconName')
  })

  it('does not write declarations when declaration generation is disabled', () => {
    const { temporaryDirectory, inputFolder } = createIconDirectory()
    const plugin = svgoStore({ inputFolder, dts: false })
    const buildStart = getHook<() => void>(plugin, 'buildStart')

    expect(() => buildStart()).not.toThrow()
    expect(fs.readdirSync(temporaryDirectory)).toEqual(['icons'])
  })

  it('deduplicates declaration writes per plugin instance', () => {
    const { temporaryDirectory, inputFolder } = createIconDirectory({
      add: '<svg xmlns="http://www.w3.org/2000/svg"/>',
    })
    const dtsPath = path.join(temporaryDirectory, 'icons.d.ts')
    const plugin = svgoStore({ inputFolder, dts: dtsPath })
    const buildStart = getHook<() => void>(plugin, 'buildStart')

    buildStart()
    fs.utimesSync(dtsPath, new Date('2000-01-01'), new Date('2000-01-01'))
    buildStart()
    expect(fs.statSync(dtsPath).mtime.getFullYear()).toBe(2000)

    const secondPlugin = svgoStore({ inputFolder, dts: dtsPath })
    getHook<() => void>(secondPlugin, 'buildStart')()
    expect(fs.statSync(dtsPath).mtime.getFullYear()).toBeGreaterThan(2000)
  })

  it('updates declarations, invalidates virtual modules, and reloads after SVG changes', () => {
    const { inputFolder } = createIconDirectory({
      add: '<svg xmlns="http://www.w3.org/2000/svg"/>',
    })
    const dtsPath = path.join(path.dirname(inputFolder), 'icons.d.ts')
    const plugin = svgoStore({ inputFolder, dts: dtsPath })
    const server = createFakeServer()
    const configureServer = getHook<(server: never) => void>(plugin, 'configureServer')
    const send = vi.spyOn(server.ws, 'send')
    const addDirectory = vi.spyOn(server.watcher, 'add')

    configureServer(server as never)
    expect(addDirectory).toHaveBeenCalledWith(inputFolder)
    expect(server.listeners.has('add')).toBe(true)
    expect(server.listeners.has('change')).toBe(true)
    expect(server.listeners.has('unlink')).toBe(true)

    const newIconPath = path.join(inputFolder, 'chart.svg')
    fs.writeFileSync(newIconPath, '<svg xmlns="http://www.w3.org/2000/svg"/>', 'utf-8')
    server.listeners.get('add')?.(newIconPath)
    expect(fs.readFileSync(dtsPath, 'utf-8')).toContain("Chart = 'chart'")

    server.listeners.get('change')?.(newIconPath)
    expect(send).toHaveBeenCalledTimes(2)
    expect(server.invalidatedModules).toHaveLength(8)

    fs.rmSync(newIconPath)
    server.listeners.get('unlink')?.(newIconPath)
    expect(fs.readFileSync(dtsPath, 'utf-8')).not.toContain("Chart = 'chart'")
    expect(send).toHaveBeenCalledTimes(3)
    expect(server.invalidatedModules).toHaveLength(12)

    server.listeners.get('change')?.(path.join(inputFolder, 'notes.txt'))
    expect(send).toHaveBeenCalledTimes(3)
  })

  it('generates executable browser code with exports and deferred SVG insertion', async () => {
    const { inputFolder } = createIconDirectory({
      add: '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>',
    })
    const plugin = svgoStore({ inputFolder, enumName: 'CustomEnum' })
    const load = getHook<(id: string) => string | null>(plugin, 'load')
    const code = load('\0@svgoStore')

    expect(code).toContain('export const svgIconNames')
    expect(code).toContain('export const svgIconIds')
    expect(code).toContain('export const CustomEnum')
    expect(code).toContain("document.addEventListener('DOMContentLoaded', insertSvg)")

    document.body.replaceChildren()
    Object.defineProperty(document, 'readyState', { configurable: true, value: 'loading' })
    const moduleUrl = `data:text/javascript;base64,${Buffer.from(code ?? '').toString('base64')}`
    const loadedModule = await import(moduleUrl)

    expect(loadedModule.svgIconNames).toEqual(['add'])
    expect(loadedModule.svgIconIds).toEqual(['icon-add'])
    expect(loadedModule.CustomEnum.Add).toBe('add')
    expect(document.body.firstElementChild).toBeNull()

    document.dispatchEvent(new Event('DOMContentLoaded'))
    expect(document.body.firstElementChild?.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
      'true',
    )
    expect((document.body.firstElementChild?.querySelector('svg') as SVGElement).style.position).toBe(
      'absolute',
    )
  })

  it('inserts the SVG immediately when the document is already ready', async () => {
    const { inputFolder } = createIconDirectory({
      add: '<svg xmlns="http://www.w3.org/2000/svg"/>',
    })
    const plugin = svgoStore({ inputFolder })
    const load = getHook<(id: string) => string | null>(plugin, 'load')
    const code = load('\0@svgoStore')

    document.body.replaceChildren()
    Object.defineProperty(document, 'readyState', { configurable: true, value: 'complete' })
    const moduleUrl = `data:text/javascript;base64,${Buffer.from(code ?? '').toString('base64')}`
    await import(moduleUrl)

    expect(document.body.firstElementChild?.querySelector('svg')).not.toBeNull()
  })
})
