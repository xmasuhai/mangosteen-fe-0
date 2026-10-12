# 编码规范

## ref 默认值

> 推荐使用 ✅

```tsx
const mainRef = useTemplateRef<HTMLElement>('mainRef')
```

> 不推荐使用 ❌

```tsx
const mainRef = useTemplateRef<HTMLElement | null>(null)
```

---
---
