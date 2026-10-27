# svgoStore（SVG 精灵图插件）前置知识清单

本文根据 [`svgoStore.md`](./svgoStore.md)、[`svgoStore.ts`](./svgoStore.ts)，以及两份类型声明文件 [`env.d.ts`](../../env.d.ts)（手写的 `declare module 'svgstore'`）和 [`svg-icons.d.ts`](../types/svg-icons.d.ts)（插件生成的最终声明）整理，列出阅读、使用和维护这个插件前需要了解的 Vite、Node.js 和 TypeScript 知识。每一项都标出它在代码中的对应位置，可以对照源码学习。

> 建议阅读顺序：先看「0. 背景概念」，再看 Node.js → TypeScript → Vite，最后用「5. 自检清单」检查掌握情况。

### 依赖版本

本文内容基于以下版本编写（来源：`package.json` 及 `node_modules` 中实际安装的版本，2026-10-27 核对）：

| 依赖 | 版本 | 本文涉及的章节 |
| --- | --- | --- |
| Node.js | `26.12.1`（`engines.node: >=26.12.1`） | 1. Node.js 前置知识 |
| pnpm | `12.15.0`（`packageManager`） | 4. 工程化与测试 |
| `@types/node` | `26.6.5` | 1. Node.js 前置知识 |
| `@tsconfig/node24` | `24.0.5` | 2.4 tsconfig |
| TypeScript | `npm:typescript-native-bridge@6.0.3-bridge.18.tsgo.7.0.2` | 2. TypeScript 前置知识 |
| `vue-tsc` | `3.3.13` | 2.4 tsconfig 与 Project References |
| Vite | `8.3.5` | 3. Vite 前置知识 |
| `svgo` | `4.1.0` | 0. 背景概念 |
| `svgstore` | `3.0.1` | 0. 背景概念、2.6.1 |
| Vitest | `5.0.5` | 4. 工程化与测试 |

> ⚠️ **如果版本更新，请更新对应文档**：升级上述任一依赖后，请核对本文相关章节（API、钩子、配置项、类型声明等）是否仍然准确，并同步更新此表格中的版本号。

---

## 0. 背景概念

| 知识点 | 需要了解的程度 | 插件中的体现 |
| --- | --- | --- |
| SVG 基础 | `<svg>`、`<symbol>`、`<use href="#id">`、`viewBox` 的作用 | 每个图标文件会变成 sprite 中的一个 `<symbol id="icon-xxx">` |
| SVG Sprite（精灵图） | 把多个图标合并进一个隐藏的 `<svg>`，页面通过 `<use>` 按 ID 引用 | `createOptimizedSprite` 生成 sprite，`generateBrowserModule` 把它插入页面 |
| `svgstore` 库 | `svgstore(options)` 创建实例，`.add(id, content)` 添加图标，`.toString({ inline })` 输出 | `createOptimizedSprite` |
| `svgo` 库 | `optimize(svgString, config)` 返回 `{ data }`；`plugins` 数组里可以写插件名，也可以写 `{ name, params }` | `getSvgoConfig`、`createOptimizedSprite` |
| 浏览器 DOM API | `document.createElement`、`innerHTML`、`insertBefore`、`appendChild`、`setAttribute` | `generateBrowserModule` 返回的代码字符串 |
| 页面加载状态 | `document.readyState === 'loading'` 与 `DOMContentLoaded` 事件的关系 | 页面还在加载时等待事件，加载完成后立即插入 |
| 无障碍 | `aria-hidden="true"` 让辅助技术忽略这个纯装饰用的 sprite 容器 | 隐藏的 sprite `<svg>` |
| 两个执行环境 | 插件代码在 **Node.js 构建进程**中运行；生成的模块字符串之后在 **浏览器**中执行 | `fs` / `path` 只用于插件端，`document` 只出现在生成的字符串里 |

---

## 1. Node.js 前置知识

### 1.1 模块与内置模块

- ESM 导入语法：`import x from '...'`、`import { a, type B } from '...'`。
- `node:` 前缀：`import path from 'node:path'` 明确表示导入 Node 内置模块，不会和同名 npm 包混淆。
- 第三方 CommonJS 包可以通过默认导入使用（如 `import svgstore from 'svgstore'`）。

### 1.2 `path` 模块

| API | 作用 | 插件中的用途 |
| --- | --- | --- |
| `path.resolve(base, p)` | 生成绝对路径；`p` 已经是绝对路径时会忽略 `base` | 根据 `process.cwd()` 解析 `inputFolder` 和 `dts` |
| `path.join(a, b)` | 拼接路径片段 | 拼出每个 SVG 文件的完整路径 |
| `path.parse(file).name` | 取不带扩展名的文件名 | `add.svg` → `add`，作为图标名 |
| `path.dirname(file)` | 取文件所在目录 | 写声明文件前先创建目录 |

### 1.3 `fs` 模块（同步 API）

| API | 作用 | 插件中的用途 |
| --- | --- | --- |
| `fs.existsSync(p)` | 判断路径是否存在 | 图标目录不存在时返回空数组 |
| `fs.readdirSync(dir)` | 读取目录的**第一层**条目，不递归 | `scanSvgIcons` 的非递归扫描 |
| `fs.readFileSync(p, { encoding: 'utf-8' })` | 按字符串读取文件 | 读取 SVG 源码 |
| `fs.mkdirSync(dir, { recursive: true })` | 递归创建目录，目录已存在时不报错 | 确保 `src/types` 存在 |
| `fs.writeFileSync(p, content, 'utf-8')` | 写入文件 | 写入 `svg-icons.d.ts` |

另外要知道：同步 API 会阻塞进程。对于少量图标的构建工具场景，这种写法简单可接受。

### 1.4 进程与工作目录

- `process.cwd()` 返回**当前工作目录**，通常是执行 `pnpm dev` / `pnpm build` 的项目根目录，不一定等于插件文件所在目录（那是 `import.meta.url` / `__dirname` 的概念）。
- 因此 `inputFolder`、`dts` 的相对路径都以项目根目录为基准。

### 1.5 文件监听（chokidar 风格事件）

- Vite 的 `server.watcher` 基于 chokidar，常用事件有 `add`（新增）、`change`（修改）和 `unlink`（删除）。
- 回调参数是发生变化的文件**绝对路径**；插件用 `file.startsWith(iconsDir) && file.endsWith('.svg')` 过滤。
- `watcher.add(dir)` 把 Vite 默认没有监听的目录加入监听。

### 1.6 JavaScript 语言基础（Node / 浏览器通用）

| 知识点 | 插件中的体现 |
| --- | --- |
| 闭包 | `createDtsWriter` 中的 `lastDtsContent`、`watchIconDirectory` 中的 `onIconChange` 都记住了创建时的局部变量 |
| 工厂函数与实例隔离 | 每次调用 `svgoStore()` 都创建独立的缓存，多个实例互不影响 |
| 模板字符串与转义 | 用 `` ` `` 拼出声明文本和浏览器代码；嵌套模板字符串中的 `` \` `` 是转义后的反引号 |
| `JSON.stringify` | 把数组序列化成合法的 JS / TS 字面量，例如 `["add","chart"]` |
| `Object.freeze` | 生成的运行时导出是不可修改的对象和数组 |
| `Set` 去重 | `[...new Set(Object.values(map))]` 得到不重复的内部模块 ID |
| `Object.prototype.hasOwnProperty.call` | 只读取对象自身属性，避免把原型上的 `toString` 等键误当作模块 |
| 正则 | `/\[name\]/g` 全局替换占位符；`/[^a-zA-Z0-9_]+/g` 清理非法字符；`/^[0-9]/` 判断是否以数字开头 |
| `localeCompare` 排序 | 图标按名称稳定排序 |
| `\|\|` 与 `??` 的区别 | `\|\|` 遇到空字符串也会使用默认值；`??` 只在 `null` / `undefined` 时使用默认值，所以 `symbolId: ''` 能生效 |
| 查表代替 `if` 分支 | `virtualModuleResolutions`、`createVirtualModuleLoaders` 返回的映射表 |

---

## 2. TypeScript 前置知识

### 2.1 类型语法

| 知识点 | 插件中的体现 |
| --- | --- |
| `interface` 与 `extends` | `SvgoStoreOptions extends SvgStoreOptions` |
| 可选属性 `?` | 所有配置项都可以省略 |
| 联合类型 | `dts?: boolean \| string`、`dtsPath: false \| string`、`boolean \| string[]` |
| 字面量类型 / 字面量联合类型 | 生成的 `type SvgIconName = 'add' \| 'chart'` |
| 索引签名 | `[key: string]: unknown` 允许把未列出的选项透传给 `svgstore` |
| `Record<K, V>` 工具类型 | `Record<string, string>`、`Record<string, () => string>` |
| `unknown` 与 `any` 的区别 | 索引签名使用更安全的 `unknown` |
| 泛型函数 | `getOwnRecordValue<T>(record: Record<string, T>, key: string): T \| undefined` |
| `as const` | `['add', 'unlink', 'change'] as const` 推断为只读元组和字面量类型，可以匹配 watcher 事件名 |
| `readonly` 数组 / 元组类型 | 声明中的 `readonly ["add","chart"]` |
| 函数类型 | `() => void`、`() => string` |
| 默认参数与参数类型 | `options: SvgoStoreOptions = {}` |
| 类型收窄 | `options.dts === false`、`typeof options.dts === 'string'` |
| `enum` | 生成的 `export enum SvgIconEnum { Add = 'add' }`；运行时用 `Object.freeze` 对象模拟同样的结构 |

### 2.2 模块与类型导入

- `import type { Plugin, ViteDevServer } from 'vite'`：只在编译期引用类型，编译后会被删除，不会产生运行时依赖。
- `import { optimize, type Config as SvgoConfig } from 'svgo'`：在一条语句中同时导入值和类型（行内 `type` 修饰符），并为类型重命名。
- `export` / `export default` / `export * from '...'` 的区别。

### 2.3 声明文件（`.d.ts`）与环境模块声明

- `.d.ts` 只描述类型，不包含实现。
- `declare module '@svgoStore' { ... }` 是**环境模块声明**（ambient module declaration）：为一个在磁盘上不存在的模块名提供类型。
- 运行时导出必须和声明保持一致。修改 `generateBrowserModule` 时，要同步修改 `generateDtsContent`。
- 生成文件顶部的 `// @ts-nocheck`、`/* eslint-disable */`、`/* prettier-ignore */` 用于关闭生成文件上的检查和格式化。
- 缺少类型的第三方包：本项目用 `// @ts-ignore` 跳过 `svgstore` 的导入检查（还配合 `eslint-disable-next-line @typescript-eslint/ban-ts-comment`）。项目的 `env.d.ts` 里其实也手写了 `declare module 'svgstore'`，但插件文件所属的 TS 项目看不到它，详见 2.6。

### 2.4 tsconfig 与 Project References（理解「问题一」的关键）

| 知识点 | 说明 |
| --- | --- |
| `include` / `exclude` | 决定文件是否属于某个 TS 项目。`.d.ts` 必须被**当前正在检查的项目**包含才会生效 |
| `references` | 根 `tsconfig.json` 引用 `tsconfig.app.json`、`tsconfig.vitest.json` 和 `tsconfig.node.json`，每个项目独立检查 |
| 子项目重写 `include` | `tsconfig.vitest.json` 自定义了 `include`，所以必须显式加入 `src/**/*.d.ts` |
| `vue-tsc --build` / `tsc -b` | 按 references 构建所有项目，`--force` 忽略增量缓存 |
| TS2307 | `Cannot find module ... or its corresponding type declarations`：模块解析失败，或者没有找到类型声明 |

核心结论：**Vite 负责运行时解析虚拟模块，TypeScript 需要独立的声明文件，而且这个文件必须属于当前 tsconfig 项目。** `pnpm build` 中类型检查和 Vite 构建可能并行执行，不能依赖 `buildStart` 先生成声明文件。

### 2.5 JSDoc / TSDoc

- `/** ... */` 注释和 `@default` 标签会显示在 IDE 的悬停提示中，用来说明选项默认值。

### 2.6 对照项目中的两份声明文件

#### 2.6.1 `env.d.ts`：为无类型的第三方包手写声明

```ts
/// <reference types="vite/client" />
/// <reference types="@10coding/vite-plugin-jsx-scoped/client" />
/// <reference types="vite-plugin-svg-icons-ng/client" />

declare module 'svgstore' {
  export interface SvgStoreOptions { /* cleanDefs、inline 等，与 svgoStore.ts 中的同名接口一致 */ }

  export interface SvgStoreInstance {
    element: unknown
    add(id: string, file: string, options?: SvgStoreOptions): SvgStoreInstance
    toString(options?: { inline?: boolean; [key: string]: unknown }): string
  }

  function svgstore(options?: SvgStoreOptions): SvgStoreInstance

  export default svgstore
}
```

| 知识点 | 说明 |
| --- | --- |
| 三斜线指令 `/// <reference types="..." />` | 引入某个包提供的全局类型。`vite/client` 提供 `import.meta.env`、`*.svg` / `*.png` 等资源模块的类型 |
| 脚本文件与模块文件 | `env.d.ts` 顶层没有 `import` / `export`，是**全局脚本**，所以其中的 `declare module 'svgstore'` 是新的环境模块声明。如果在顶层加了 `import`，文件会变成模块，`declare module` 就变成**模块扩充**（module augmentation），原包没有类型时会失效 |
| 在声明中描述 CommonJS 包 | `svgstore` 运行时是 `module.exports = function`，声明里用 `export default svgstore` 来匹配 `import svgstore from 'svgstore'`，这依赖 `esModuleInterop` / `allowSyntheticDefaultImports` 或 `moduleResolution: "bundler"` |
| 方法返回自身类型 | `add(...): SvgStoreInstance` 描述链式调用 |
| 声明内的 `function` | 环境声明中只写函数签名，不写函数体 |
| 声明与实现的重复 | `SvgStoreOptions` 在 `env.d.ts` 和 `svgoStore.ts` 里各写了一份，修改一处时要记得同步另一处 |

**声明文件是否生效，取决于它属于哪个 tsconfig 项目：**

| TS 项目 | 是否包含 `src/plugins/svgoStore.ts` | 是否包含 `env.d.ts` | 结果 |
| --- | --- | --- | --- |
| `tsconfig.node.json` | 是（`src/plugins/**/*`） | 否 | 看不到 `declare module 'svgstore'`，`import svgstore` 会报错，所以插件中需要 `@ts-ignore` |
| `tsconfig.app.json` | 是（`src/**/*`） | 是 | 能看到声明 |
| `tsconfig.vitest.json` | 测试文件间接引用 | 是 | 能看到声明 |

所以 `svgoStore.ts` 中「svgstore 没有可用的类型声明」这句注释，准确的意思是：**在 Node 项目（`tsconfig.node.json`）里没有可用的声明**。如果想去掉 `@ts-ignore`，可以把声明移到一个被 `tsconfig.node.json` 包含的文件里（例如 `src/plugins/svgstore.d.ts`），或者把 `env.d.ts` 加入它的 `include`。注意 `env.d.ts` 引用了 `vite/client` 等浏览器端类型，直接加入 Node 项目可能把不适合 Node 的全局类型一起带进来。

#### 2.6.2 `src/types/svg-icons.d.ts`：插件生成的最终声明

这是 `generateDtsContent` 的实际输出，下面是节选（以当前 16 个图标为例）：

```ts
declare module '@svgoStore' {
  export enum SvgIconEnum {
        Add = 'add',
    BackArrow = 'back-arrow',
    Decimal_point = 'decimal_point',
    // ...
  }

  export type SvgIconName = 'add' | 'back-arrow' | 'backspace' | /* ... */ 'tech_stack'
  export type SvgIconNames = SvgIconName

  export const svgIconNames: readonly ["add","back-arrow", /* ... */]
  export const svgIconIds: readonly ["icon-add","icon-back-arrow", /* ... */]
  const defaultExport: readonly ["add","back-arrow", /* ... */]
  export default defaultExport
}

declare module 'virtual:svgoStore' {
  export * from '@svgoStore'
  const defaultExport: readonly [/* ... */]
  export default defaultExport
}
```

| 知识点 | 说明 |
| --- | --- |
| 生成代码与源码的对应 | 模板中的 `${enumName}`、`${unionType}`、`${tupleNames}` 分别展开为 `SvgIconEnum`、字面量联合类型和元组字面量 |
| 环境枚举 `export enum` | 声明中的 enum 只提供类型；运行时的值来自 `load` 返回的 `Object.freeze({ Add: 'add', ... })`。两者的成员名和值必须一致，否则 `SvgIconEnum.Add` 类型检查能通过，运行时却是 `undefined` |
| 字符串枚举的成员名 | `toPascalCase` 只把 `[^a-zA-Z0-9_]` 当作分隔符，所以 `back-arrow` → `BackArrow`，而 `decimal_point` 保留下划线，得到 `Decimal_point` |
| `readonly` 元组类型 | `readonly ["add","chart"]` 比 `readonly string[]` 更精确：长度固定，每个元素都是字面量类型 |
| 只声明不导出的 `const` | `const defaultExport: ...` 加上 `export default defaultExport`，是在声明文件中描述默认导出的常见写法 |
| `export *` 再导出 | `virtual:svgoStore` 通过 `export * from '@svgoStore'` 复用主模块的全部具名导出；`export *` 不包含默认导出，所以要单独声明 `default` |
| 类型别名 | `SvgIconNames = SvgIconName` 只是同一个类型的另一个名字，不是数组类型 |
| 文件头指令 | `// @ts-nocheck` 关闭该文件的类型检查；`/* eslint-disable */`、`/* prettier-ignore */` 避免工具检查或改写生成文件 |
| 格式细节 | 第一个枚举成员前有 8 个空格，因为模板在 `${enumEntries}` 前写了 4 个空格，而每个条目自身也带 4 个空格。这不影响类型，但能看出生成文本与模板的对应关系 |
| 文件被谁读取 | `tsconfig.app.json`（`src/**/*`）和 `tsconfig.vitest.json`（`src/**/*.d.ts`）包含它；这就是 `svgoStore.md` 中修复 TS2307 的关键 |
| 生成文件与版本控制 | 它会被插件覆盖，不要手动修改；新增或删除图标后，`pnpm dev` 或 `pnpm build` 会重新生成 |

---

## 3. Vite 前置知识

### 3.1 插件基础

- Vite 插件是一个带 `name` 和若干钩子的对象，通常由工厂函数返回：`svgoStore(options): Plugin`。
- 插件在 `vite.config.ts` 的 `plugins` 数组中注册：`plugins: [svgoStore()]`。
- Vite 插件 API 扩展自 Rollup 插件 API。`resolveId`、`load` 和 `buildStart` 是 Rollup 通用钩子，`configureServer` 是 Vite 独有的钩子。
- 插件钩子只在 Node.js 中执行，不会被打包进浏览器代码。

### 3.2 本插件用到的钩子

| 钩子 | 运行时机 | 插件中做了什么 |
| --- | --- | --- |
| `buildStart` | 开发服务器启动和生产构建开始时 | 写入 `.d.ts` |
| `configureServer(server)` | 仅开发服务器启动时 | 写入 `.d.ts`，注册图标目录监听 |
| `resolveId(id)` | 每个 `import` 解析时 | 将 `@svgoStore` 等名称映射为 `\0` 开头的内部 ID；返回 `null` 表示交给其他插件处理 |
| `load(id)` | 加载已解析的模块时 | 根据内部 ID 返回生成的 JS 源码字符串；返回 `null` 表示不处理 |

### 3.3 虚拟模块约定

- 虚拟模块：磁盘上不存在、由插件在 `load` 中动态生成内容的模块。
- 命名约定：用户侧常用 `virtual:xxx` 前缀；本插件还支持 `@svgoStore`，并兼容旧名称 `svg_bundle.ts`。
- 内部 ID 前缀 `\0` 是 Rollup / Vite 的约定，告诉其他插件（如 CSS 和资源插件）不要把它当作真实文件处理。
- `load` 收到的是 `resolveId` 返回后的 ID，所以加载器映射表的键带有 `\0`。

### 3.4 开发服务器 API（`ViteDevServer`）

| API | 作用 |
| --- | --- |
| `server.watcher` | chokidar 文件监听实例（见 1.5） |
| `server.moduleGraph.getModuleById(id)` | 从模块图中找到已加载的模块 |
| `server.moduleGraph.invalidateModule(mod)` | 让模块缓存失效，下次请求时重新执行 `load` |
| `server.ws.send({ type: 'full-reload' })` | 通过 HMR WebSocket 通知浏览器整页刷新 |

需要理解：Vite 会缓存模块，只修改磁盘上的 SVG 文件不会自动更新虚拟模块，必须**先让模块失效，再刷新页面**。本插件使用整页刷新，而不是局部 HMR（`handleHotUpdate` / `import.meta.hot`）。

### 3.5 运行环境与 SSR 边界

- `load` 返回的代码面向浏览器，直接使用 `document`。如果要用于 SSR，需要额外判断环境或拆分实现。
- 开发模式（`vite dev`）和生产构建（`vite build`）都会执行 `resolveId` / `load`；`configureServer` 只在开发模式中执行。

---

## 4. 工程化与测试

测试文件 [`src/plugins/__tests__/svgoStore.spec.ts`](./__tests__/svgoStore.spec.ts) 覆盖了插件的全部核心行为与边界场景。理解该测试文件需要掌握以下 Vitest、Node.js 与 DOM 相关的测试技术与模式。

### 4.1 Vitest 与插件单元测试核心理念

- **直接调用插件钩子**：无需启动完整的 Vite 实例，直接调用 `plugin.resolveId`、`plugin.load`、`plugin.buildStart`、`plugin.configureServer`，执行速度快（毫秒级）且定位精确。
- **泛型提取钩子类型**：
  ```ts
  function getHook<T extends (...args: never[]) => unknown>(
    plugin: ReturnType<typeof svgoStore>,
    name: string,
  ) {
    return plugin[name as keyof typeof plugin] as T
  }
  ```
  通过 TypeScript 泛型收窄钩子函数的调用签名，解决插件对象索引访问时调用签名不明确的问题。
- **Vitest 基础 API**：`describe`、`it`、`expect`、`afterEach`、`vi.spyOn`。

### 4.2 Mock 技术与测试替身（Test Double）

- **开发服务器模拟（`createFakeServer`）**：
  ```ts
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
  ```
  - 用 `Map` 收集 `watcher.on` 注册的监听器，在测试中可随时主动触发 `listeners.get('add')?.(filePath)`，精确模拟文件增删改。
  - 模拟 `moduleGraph.getModuleById` 和 `moduleGraph.invalidateModule`，记录哪些虚拟模块被标记失效。
  - 使用 `vi.spyOn(server.ws, 'send')` 追踪 HMR 刷新消息的发送次数与参数。

### 4.3 动态执行生成代码与 DOM 仿真

- **Data URI 动态导入（`data:text/javascript;base64,...`）**：
  - `load` 钩子返回的是一段 JavaScript 源码字符串。为了验证其运行时行为，测试将其转为 Base64 编码的 Data URL，然后通过 `await import(moduleUrl)` 动态加载为真实模块。
  - 这样既能验证生成的 ESM 语法合法，又能直接断言导出的 `svgIconNames`、`svgIconIds` 及枚举对象的值。
- **DOM 就绪状态与事件模拟**：
  - `document.body.replaceChildren()`：重置测试 DOM。
  - `Object.defineProperty(document, 'readyState', { configurable: true, value: 'loading' | 'complete' })`：动态修改文档加载状态。
  - `document.dispatchEvent(new Event('DOMContentLoaded'))`：模拟触发 DOM 就绪事件，验证等待事件后才插入 SVG 的逻辑。
  - 对生成的 `<svg>` 元素断言 `aria-hidden="true"` 和 `style.position === 'absolute'`。

### 4.4 文件系统隔离与测试清理

- **隔离临时目录**：
  ```ts
  fs.mkdtempSync(path.join(process.cwd(), 'node_modules', '.tmp', 'svgoStore-test-'))
  ```
  将测试产生的临时目录限定在 `node_modules/.tmp` 中，避免污染源码目录或受并发影响。
- **生命周期清理**：在 `afterEach` 钩子中取出所有临时目录并调用 `fs.rmSync(dir, { recursive: true, force: true })` 彻底删除。
- **缓存写入验证（时间戳检查）**：
  - 使用 `fs.utimesSync(dtsPath, new Date('2000-01-01'), new Date('2000-01-01'))` 将文件修改时间强制设为旧时间。
  - 再次调用 `buildStart()`，若内容未改变，插件应跳过写入，此时 `fs.statSync(dtsPath).mtime` 仍为 2000 年，由此验证闭包缓存生效。
  - 新建另一个插件实例执行 `buildStart()`，时间戳被更新，验证不同实例之间缓存隔离。

### 4.5 边界用例覆盖策略

- **原型属性注入防护**：测试调用 `resolveId('toString')` 和 `load('toString')`，确保返回 `null`，不会把 `Object.prototype` 上的属性误当成虚拟模块。
- **空目录回退**：测试目录没有 SVG 时，导出的数组为空 `[]`，声明中的 `type MyIconName` 正确回退为 `string`。
- **非 SVG 变更过滤**：测试向图标目录写入 `notes.txt` 并触发 `change` 事件，验证不触发 `ws.send` 与模块失效。

---

## 5. 自检清单

能回答下面的问题，就具备了阅读和维护这个插件所需的基础：

- [ ] 为什么 `fs` / `path` 可以出现在插件中，而 `document` 只能出现在生成的字符串中？
- [ ] `path.resolve(process.cwd(), 'src/assets/icons')` 的结果取决于什么？
- [ ] `symbolId: ''` 时为什么必须用 `??` 而不是 `||`？
- [ ] `resolveId` 返回 `'\0@svgoStore'` 后，`load` 收到的 `id` 是什么？`\0` 有什么作用？
- [ ] 为什么 Vite 能解析 `@svgoStore`，`tsc` 却可能报 TS2307？修复时改了哪个 tsconfig 的哪一项？
- [ ] `declare module` 中的类型和 `load` 返回的运行时导出不一致时，会出现什么问题？
- [ ] `import type` 和普通 `import` 编译后的结果有什么不同？
- [ ] 新增一个 SVG 文件后，插件依次执行哪三步，浏览器才能显示新图标？
- [ ] 为什么两次调用 `svgoStore()` 不会共享 `lastDtsContent`？
- [ ] `as const` 对 `['add', 'unlink', 'change']` 的类型推断有什么影响？
- [ ] `env.d.ts` 已经声明了 `svgstore`，为什么 `svgoStore.ts` 还需要 `@ts-ignore`？
- [ ] 在 `env.d.ts` 顶层加一行 `import`，`declare module 'svgstore'` 的含义会怎样变化？
- [ ] `svg-icons.d.ts` 中的 `export enum SvgIconEnum` 和运行时的 `Object.freeze({...})` 分别负责什么？
- [ ] 为什么 `virtual:svgoStore` 写了 `export * from '@svgoStore'`，还要单独声明 `default`？
- [ ] 在 Vitest 中如何对插件钩子进行单元测试而无需启动完整 Vite 实例？
- [ ] 如何使用 Data URI（`data:text/javascript;base64,...`）与 `import()` 在 Node/Vitest 环境中动态执行 `load` 钩子生成的浏览器代码？
- [ ] 为什么在测试声明文件写入防重时需要用 `fs.utimesSync` 修改时间戳？
- [ ] 如何通过 Mock `server.watcher` 与 `server.moduleGraph` 来验证文件增删改时的模块失效与 HMR 刷新？

---

## 6. 推荐参考资料

- Vite 插件 API：<https://vite.dev/guide/api-plugin>（重点阅读「虚拟模块约定」「通用钩子」「Vite 独有钩子」）
- Rollup 插件开发：<https://rollupjs.org/plugin-development/>
- Node.js `fs` / `path` 文档：<https://nodejs.org/api/fs.html>、<https://nodejs.org/api/path.html>
- TypeScript 模块声明：<https://www.typescriptlang.org/docs/handbook/modules/reference.html#ambient-modules>
- TypeScript Project References：<https://www.typescriptlang.org/docs/handbook/project-references.html>
- TypeScript 声明文件与模块扩充：<https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html>、<https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation>
- 三斜线指令：<https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html>
- SVGO：<https://svgo.dev/>；svgstore：<https://github.com/svgstore/svgstore>
