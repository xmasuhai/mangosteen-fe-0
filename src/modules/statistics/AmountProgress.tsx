import { defineComponent, ref } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 金额进度条
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-26 13:54:47
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-26 15:23:32
 * @FilePath: src/modules/statistics/AmountProgress.tsx
 */
export const AmountProgress = defineComponent({
  name: 'AmountProgress',
  setup(_props, _ctx) {
    const barProgressList = ref([
      { id: '1', tag: { sign: '😄', name: '房租', id: '1' }, amount: '3112', percent: '11' },
      { id: '2', tag: { sign: '💰', name: '工资', id: '2' }, amount: '32112', percent: '56' },
      { id: '3', tag: { sign: '💵', name: '奖金', id: '3' }, amount: '12323', percent: '33' },
    ])

    return () => (
      <div
        class={cn('bar-progress mb-8em', '[&>.top-item]:[--sibling-idx:calc(1*sibling-index())]',)}>
        {barProgressList.value.map(({ id, tag, amount, percent }) => (
          <div
            key={id}
            style={{ '--width-percent': `${percent}%` }}
            class={cn('top-item mb-1em flex items-center justify-between')}>
            <div
              class={cn(
                'sign size-3em rounded-[50%] bg-[var(--tag-bg)]',
                'grow-0 shrink-0 flex items-center justify-center',
              )}>
              {tag.sign}
            </div>
            <div class="bar-wrapper ml-1em grow-1 shrink-1">
              <div class="bar_text text-[var(--text-muted)] flex items-center justify-between">
                <span>
                  {tag.name} - {percent}%
                </span>
                <span> ¥ {amount}</span>
              </div>
              <div class="bar h-.5em rounded-.25em bg-[var(--bar-bg)] relative overflow-clip mt-.25em">
                <div
                  class={cn(
                    'bar_inner absolute top-0 left-0',
                    `w-[var(--width-percent)] h-full`,
                    `bg-[oklch(70%_0.15_calc(var(--sibling-idx)*70))]`,
                  )}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  },
})
