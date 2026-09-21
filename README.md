# 我的 Vue3 + TSX 记账项目 mangosteen-fe-0 🚀 项目启动与开发规范

> 网页预览：http://xmasuhai.github.io/mangosteen-fe-0-publish/

为了确保团队环境的一致性，本项目通过 **Corepack** 严格锁定了 Node.js 版本和包管理器（`pnpm`）。请在开发前按照以下步骤配置你的本地环境。

## 🛠️ 环境准备

### 1. 检查 Node.js 版本
请确保你的本地 Node.js 版本符合项目要求：
* **要求版本**：`>=22.23.2`
* **检查命令**：`node -v`

### 2. 开启官方 Corepack
本项目利用 Node.js 自带的 Corepack 来管理包管理器版本，无需你全局手动安装 pnpm。请在终端执行以下命令开启它：

```bash
corepack enable
corepack prepare pnpm@11.27.0 --active
```

---

## 📦 依赖安装与启动

配置完成后，你可以直接在项目根目录下执行以下命令：

### 安装依赖

```bash
pnpm install
```

> ⚠️ **注意**：请勿使用 `npm install` 或 `yarn install`。项目中配置了拦截脚本，使用非 `pnpm` 命令将会导致安装失败。

### 本地开发

```bash
pnpm dev
```

### 项目打包

```bash
pnpm build
```

---

## ❓ 常见问题排查

**Q: 运行 `pnpm install` 提示 `Command not found`？**
A: 请确保你已经成功执行了 `corepack enable`。如果依然报错，请尝试重启终端。

**Q: 运行 `npm install` 报错 `请使用 pnpm 进行安装！`？**
A: 本项目已锁定包管理器，请严格使用 `pnpm install` 提交和管理依赖。

---
---

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

This project replaces its workspace TypeScript package with [typescript-native-bridge](https://github.com/johnsoncodehk/typescript-native-bridge). Command-line tools use the bridge automatically. To use it in VS Code after installing dependencies, accept the prompt to use the workspace TypeScript version. If the prompt does not appear, run **TypeScript: Select TypeScript Version** and choose **Use Workspace Version**.

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
