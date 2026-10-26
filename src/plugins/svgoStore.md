# svgoStore 插件处理记录与使用说明

本文整理了 `svgoStore` 相关的两次处理：先修复 `pnpm build` 中虚拟模块的 TypeScript 声明解析错误，再拆分插件职责、降低主函数复杂度，并为实现补充中文注释。内容依据当前实现和已执行的验证记录编写。

## 相关文件

- [`svgoStore.ts`](./svgoStore.ts)：插件实现、图标扫描、声明生成和虚拟模块代码生成。
- [`svgoStore.spec.ts`](./__tests__/svgoStore.spec.ts)：插件行为的单元测试。
- [`svg-icons.d.ts`](../types/svg-icons.d.ts)：`@svgoStore` 等虚拟模块的 TypeScript 声明。
- [`tsconfig.vitest.json`](../../tsconfig.vitest.json)：测试 TypeScript 项目的文件范围。
- [`tsconfig.app.json`](../../tsconfig.app.json)：应用 TypeScript 项目的文件范围。
- [`tsconfig.json`](../../tsconfig.json)：通过 project references 组合应用、测试和 Node 配置。
- [`vite.config.ts`](../../vite.config.ts)：项目注册 `svgoStore()` 的位置。

## 问题一：构建无法识别 `@svgoStore`

### 报错现象

执行 `pnpm build` 时，类型检查曾报告：

```text
error TS2307: Cannot find module '@svgoStore' or its corresponding type declarations.
```

报错出现在 `src/components/icons/SvgIcon.tsx` 和 `src/modules/items/useNumpadButtons.tsx` 对 `@svgoStore` 的导入处。

### 为什么 Vite 能解析、TypeScript 却会报错

`@svgoStore` 不是磁盘上的 npm 包，而是插件提供的**虚拟模块**。在 Vite 构建或开发服务器运行时，`svgoStore` 的 `resolveId` 钩子会把这个名字映射到带 `\0` 前缀的内部 ID，再由 `load` 钩子生成模块内容。

TypeScript 的类型检查是另一条独立流程。Vite 的 `resolveId` / `load` 钩子不会自动告诉 TypeScript 这个虚拟模块有哪些类型，因此还需要一个 ambient module declaration（环境模块声明）。项目已有的 `src/types/svg-icons.d.ts` 声明了 `@svgoStore` 及相关虚拟模块。

根因在于 TypeScript project references 和 `include` 的组合：

1. 根 [`tsconfig.json`](../../tsconfig.json) 引用了应用项目和 Vitest 测试项目。
2. [`tsconfig.app.json`](../../tsconfig.app.json) 包含应用源码，但排除了测试目录。
3. [`tsconfig.vitest.json`](../../tsconfig.vitest.json) 为测试项目重新设置了 `include`，当时只包含测试文件和 `env.d.ts`，没有把 `src/**/*.d.ts` 纳入这个项目。
4. 测试项目引用的业务源码中也使用了 `@svgoStore`，但该项目没有加载声明该虚拟模块的 `.d.ts` 文件，于是报 TS2307。

简化理解：**Vite 负责运行时模块解析；TypeScript 需要独立的声明文件，并且声明文件必须属于当前执行类型检查的 tsconfig 项目。**

### 修复内容

在 `tsconfig.vitest.json` 的 `include` 中加入 `src/**/*.d.ts`，并保留测试源码和 `env.d.ts`：

```jsonc
"include": ["src/**/__tests__/*", "src/**/*.d.ts", "env.d.ts"]
```

同时在配置注释中说明：测试导入的业务代码可能依赖应用的类型声明。没有移除测试项目、放宽类型检查、添加 `any` 或忽略 TS2307；插件、依赖和锁文件也未因此调整。

## 问题二：拆分 `svgoStore` 并补充学习注释

### 重构目标与边界

此前提出 `svgoStore` 函数复杂度较高，并希望给 TypeScript 和 Vite 插件初学者提供详细说明。重构重点是把不同职责提取为同文件内的辅助函数，让 `svgoStore` 主函数负责创建实例状态并组装 Vite 钩子；公开的 `svgoStore`、`scanSvgIcons`、`generateDtsContent` API 和插件行为保持兼容。

收到的“复杂度高 367%”提示没有对应到项目中明确配置的复杂度规则或阈值。因此，本次处理没有声称取得某个百分比的量化下降，也没有修改阈值来消除提示；主要通过减少主函数中的条件分支和重复逻辑来改善结构。

### 当前代码职责分层

插件仍集中在一个文件，便于沿调用关系学习，不额外引入插件类或框架：

| 函数 / 区域 | 职责 |
| --- | --- |
| `resolveOptions` | 将部分可选配置补齐为插件实例使用的完整配置。 |
| `scanSvgIcons` | 扫描图标目录第一层的 `.svg` 文件，并生成名称、sprite ID 和路径。 |
| `generateDtsContent` | 根据图标清单生成 TypeScript 声明文本。 |
| `createDtsWriter` | 创建声明文件写入函数，并在闭包中缓存本插件实例上次写入的内容。 |
| `watchIconDirectory` | 监听图标文件新增、删除和修改。 |
| `reloadVirtualModules` | 更新声明、失效 Vite 模块缓存并触发页面完整刷新。 |
| `getSvgoConfig` / `createOptimizedSprite` | 取得 SVGO 配置、读取并合并 SVG，生成优化后的精灵图标标记。 |
| `generateBrowserModule` | 拼出浏览器稍后执行的 JavaScript 源码字符串。 |
| `createVirtualModuleLoaders` | 将规范化后的虚拟模块 ID 映射到对应的加载函数。 |
| `svgoStore` | 创建实例作用域内的配置、声明写入器和加载器，并返回 Vite 插件钩子。 |

过去分散的模块 ID 分支改为映射表，文件监听的 `add`、`change`、`unlink` 事件复用同一回调。`getOwnRecordValue` 使用 `Object.prototype.hasOwnProperty.call`，避免将对象原型上的 `toString` 等键误判为有效模块。

## 插件是怎样工作的

### 1. 创建插件实例并规范化选项

Vite 配置中的 `svgoStore()` 调用 `svgoStore` 工厂函数。工厂将默认值解析一次，并为这个实例创建独立的声明写入缓存和虚拟模块加载器。这里的“闭包”指辅助函数返回的回调仍能访问创建它时的局部配置或缓存；不同插件实例因此不会共享 `lastDtsContent`。

### 2. 写入 TypeScript 声明

`buildStart` 和开发服务器的 `configureServer` 会调用声明写入器。它扫描图标、生成声明；如果生成内容与当前实例上次写入的内容相同，就跳过磁盘写入，避免不必要的重复更新。声明内容包括：

需要特别区分：`buildStart` 是 Vite 的生命周期钩子，不是 TypeScript 项目文件范围的替代品。`pnpm build` 中类型检查与 Vite 构建可以并行运行，因此不能依赖 Vite 钩子先生成声明、再让类型检查读取；本次修复通过 `tsconfig.vitest.json` 将已有 `.d.ts` 纳入项目。

- `@svgoStore`：枚举、图标名称类型、名称和 ID 列表，以及默认导出。
- `virtual:svgoStore`：转出主模块声明。
- `virtual:svg-icons/names` 和 `virtual:svg-icons/ids`：各自的默认导出列表。

有图标时，`SvgIconName` 会是如 `'add' | 'chart'` 这样的字面量联合类型；没有图标时会退化为 `string`。`typeName` 还会生成对应的复数别名，例如 `SvgIconNames = SvgIconName`。

### 3. 扫描并生成 sprite

`scanSvgIcons` 用 `process.cwd()` 解析图标目录，只扫描该目录的第一层，不递归进入子目录。每个文件的名称取自不带扩展名的文件名；默认 ID 为 `icon-[name]` 中替换 `[name]` 后的结果。扫描结果按名称排序。

主虚拟模块加载时，插件通过 `svgstore` 合并 SVG，再调用 `svgo` 优化输出。`getSvgoConfig` 在没有传入 `svgoConfig` 时使用当前文件内的默认优化插件；传入自定义配置时则使用用户提供的配置。

### 4. 解析和加载虚拟模块

Vite 插件的 `resolveId` 将用户导入的模块名映射到 Vite 内部 ID。`\0` 是 Vite / Rollup 虚拟模块 ID 的标记，不代表磁盘文件名。随后 `load` 根据内部 ID 查找加载器并返回生成的模块源码。

当前支持的导入名：

| 导入名 | 用途 |
| --- | --- |
| `@svgoStore` | 主模块：注入 sprite，并导出名称、ID、枚举对象和默认名称列表。 |
| `virtual:svgoStore` | 主模块的另一种虚拟模块名称。 |
| `virtual:svg-icons/names` | 默认导出图标名称数组。 |
| `virtual:svg-icons/ids` | 默认导出 sprite ID 数组。 |
| `svg_bundle.ts` | 兼容旧代码的解析别名，映射到 `@svgoStore` 对应的内部模块。 |

虽然 `svg_bundle.ts` 仍由 Vite 解析器兼容处理，生成的 `.d.ts` 没有单独声明这个旧名称。新代码应使用 `@svgoStore`，以匹配现有类型声明。

### 5. 在浏览器插入 SVG

插件在 Node.js 构建进程中读取文件并**生成 JavaScript 字符串**。字符串被 Vite 加载后才会在浏览器页面中运行；因此插件阶段的 `fs`、`path` 与浏览器阶段的 `document` 是不同执行环境中的代码。

浏览器代码创建包含 sprite 的 `div`，将 SVG 隐藏并设置 `aria-hidden="true"`，然后插入 `document.body` 的开头。如果页面仍在加载，会等待 `DOMContentLoaded`；如果页面已经就绪，则立即插入。当前主模块是面向浏览器的实现，不应当作可在无 DOM 的 SSR 环境中直接执行的模块。

### 6. 开发期图标热更新

开发服务器监听配置的图标目录。当目录内 `.svg` 文件新增、修改或删除时，回调会：

1. 重新扫描文件并更新声明文件。
2. 让 Vite 模块图中已加载的虚拟模块缓存失效。
3. 发送 `full-reload`，使浏览器重新取得 sprite 和图标清单。

目录之外的文件或非 `.svg` 文件不会触发这个刷新处理。当前实现使用页面完整刷新，而不是局部热替换。

## 配置与使用

项目当前在 [`vite.config.ts`](../../vite.config.ts) 中注册插件：

```ts
import { svgoStore } from './src/plugins/svgoStore.ts'

export default defineConfig({
  plugins: [
    // 其他 Vite 插件……
    svgoStore(),
  ],
})
```

所有选项均可省略。需要自定义时可以传入对象：

```ts
svgoStore({
  inputFolder: 'src/assets/icons',
  symbolId: 'icon-[name]',
  dts: 'src/types/svg-icons.d.ts',
  enumName: 'SvgIconEnum',
  typeName: 'SvgIconName',
  // svgoConfig: { plugins: [...] },
})
```

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `inputFolder` | `src/assets/icons` | SVG 源目录；相对路径以 `process.cwd()` 为基准。 |
| `symbolId` | `icon-[name]` | sprite ID 模板；所有 `[name]` 占位符会被文件名替换。显式空字符串会让 ID 直接使用文件名。 |
| `dts` | `src/types/svg-icons.d.ts` | 声明文件路径；设为 `false` 可关闭生成，也可传字符串更换目标路径。 |
| `enumName` | `SvgIconEnum` | 生成的枚举名称和主虚拟模块运行时对象名称。 |
| `typeName` | `SvgIconName` | 生成的图标名称类型名称。 |
| `svgoConfig` | 插件内置配置 | 覆盖 SVGO 优化配置。 |
| 其他 `SvgStoreOptions` | 由 `svgstore` 处理 | `cleanDefs`、`cleanSymbols`、`inline`、`svgAttrs`、`symbolAttrs`、`copyAttrs`、`renameDefs` 等选项会透传给 `svgstore`。 |

`SvgStoreOptions` 中的问号表示配置项可选；`Record<string, ...>` 表示一个键值映射类型；`import type` 用于只在 TypeScript 编译期间引用类型，不会生成相应的运行时导入。

## 回归测试覆盖

`src/plugins/__tests__/svgoStore.spec.ts` 当前有 11 项测试，覆盖：

- 图标扫描、文件名和默认 symbol ID。
- 声明文本中的枚举、字面量联合类型和虚拟模块声明。
- 主虚拟模块及所有支持别名的解析，未知名称的处理。
- 自定义 symbol ID 模板、独立名称 / ID 模块及空目录。
- 自定义枚举与类型名称、关闭声明生成。
- 同一插件实例避免重复写入声明，不同实例仍各自执行首次写入。
- 图标新增 / 修改 / 删除后的声明更新、模块失效和页面刷新；忽略无关文件。
- 生成的浏览器模块导出内容，以及 DOMContentLoaded 前后两种 SVG 插入时机。

## 已执行的验证记录

以下结果来自本次文档整理之前已完成的插件重构与构建修复，不表示为了新增这份文档而重新执行了命令：

| 检查 | 记录结果 |
| --- | --- |
| `pnpm exec vitest run 'src/plugins/__tests__/svgoStore.spec.ts'` | 通过，1 个测试文件、11 项测试全部通过。 |
| `pnpm exec eslint 'src/plugins/svgoStore.ts' 'src/plugins/__tests__/svgoStore.spec.ts'` | 通过，无输出。 |
| `pnpm exec vue-tsc --build --force` | 通过，退出码为 0。 |
| `pnpm build` | 通过；类型检查和 Vite 生产构建均完成。 |

构建记录中另有两个提示，不影响上述成功结果：此前 pnpm 依赖预检查指出 `pnpm-lock.yaml` 与 `package.json` 中 `svgo` / `svgstore` 依赖信息不一致，本次工作没有改锁文件；Vite 生产构建还提示有压缩后超过 500 kB 的 chunk。两者均不属于本次插件文档或类型声明修复的范围。

## 维护时需要留意

- 修改虚拟模块运行时导出时，也要同步检查 `generateDtsContent` 中的声明，避免 JavaScript 导出与 TypeScript 类型不一致。
- 自定义 `enumName` 和 `typeName` 会影响生成代码和声明名称；更改后应验证两边一致。
- 关闭 `dts` 只会停止插件写声明文件。如果应用仍导入 `@svgoStore`，TypeScript 仍需要其他地方提供这个模块的声明。
- `inputFolder` 采用当前工作目录解析，且扫描不递归；改变这两个路径行为会影响现有项目配置。
- 热更新会触发完整页面刷新；若要改为局部更新，应额外设计并测试模块更新语义。
- 更新测试时，临时图标目录会在测试清理钩子中删除；测试创建的临时文件应继续限定在项目自己的 `node_modules/.tmp` 子目录内。