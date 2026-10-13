# 自制 vite 插件说明

> `src/plugins/svgoStore.ts`

- 将所有 svg 图标文件都加载到同一个 `<svg>` 中
- 将图标文件名称作为 id，导出名称列表，并动态生成枚举类型

> `src/types/svg-icons.d.ts`

- 可用虚拟模块 `virtual:svgoStore`
- 可用虚拟模块 `virtual:svg-icons/names`
- 可用虚拟模块 `virtual:svg-icons/ids`

> vite 简单配置

```ts
import { fileURLToPath, URL, } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgoStore } from './src/plugins/svgoStore.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgoStore(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

> 使用范例 `src/components/icons/SvgIcon.tsx`

```tsx
import {
  svgIconNames,
  type SvgIconNames,
  type SvgIconName,
  SvgIconEnum,
} from '@svgoStore'

interface SvgIconProps {
  name: SvgIconNames
}

export const SvgIcon = defineComponent<SvgIconProps>({
  name: 'SvgIcon',
  props: {
    name: {
      type: String as PropType<SvgIconNames>,
      required: true,
      validator: (value: unknown) =>
        typeof value === 'string' && (svgIconNames as readonly string[]).includes(value),
    },
  },
  setup(props, _ctx) {
    // 添加验证
    if (!props.name || !(svgIconNames as readonly string[]).includes(props.name)) {
      console.error(`Invalid icon name: ${props.name}`)
    }

    return () => (
      <svg
        class={cn(
          'where:(h-1em w-1em align-[-0.15em] fill-[currentColor] overflow-clip)',
        )}
        aria-hidden="true">
        <use xlinkHref={`#icon-${props.name}`}/>
      </svg>
    )
  },
})
```

---
---
