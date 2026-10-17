import { defineComponent } from 'vue'
import { BarButton } from '@/components/BarButton.tsx'
import { cn } from 'cn'

/**
 * @Description: 标签表单
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-17 15:55:38
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-17 22:06:23
 * @FilePath: src/modules/tags/TagForm.tsx
 */
export const TagForm = defineComponent({
  name: 'TagForm',
  setup(/* _props, _ctx */) {
    const navList = [
      '表情',
      '手势',
      '职业',
      '衣服',
      '动物',
      '自然',
      '实物',
      '运动',
      '表情',
      '手势',
      '职业',
      '衣服',
      '动物',
      '自然',
      '实物',
      '运动',
    ]
    return () => (
      <form class="form p-1em min-h-720px h-full">
        <div class="formRow mt-0.5em flex-grow-0">
          <label for="tag-name" class="">
            <span class="formItem_name">标签名称</span>
            <div class="formItem_value flex mt-0.25em">
              <input
                id="tag-name"
                class={cn(
                  'flex-grow-1 min-h-[var(--input-min-height)] max-w-100%',
                  'b-1 rounded-[var(--input-radius)]',
                  'text-18px p-x-1em shadow-[inset_0_0_3px_var(--input-shadow)]',
                  // 动态切换边框颜色 hasError
                  Math.random() > .5 ? 'b-[var(--input-border-color)]' : 'b-[var(--error-color)]'
                )}/>
            </div>
            <div class="m-t-.25em text-12px color-[var(--error-color)]">
              <span>必填</span>
            </div>
          </label>
        </div>

        <div class="formRow mt-0.5em">
          <label class="flex flex-col">
            <span class="formItem_name">符号</span>

            <div class={cn(
              'formValue',
              'flex mt-0.25em',
            )}>
              <div class={cn(
                'formItem emojiList error',
                'min-h-[var(--input-min-height)] max-w-full flex-grow-1',
                'b-1 rounded-[var(--input-radius)] text-14px',
                // 动态切换边框颜色 hasError
                Math.random() > .5 ? 'b-[var(--input-border-color)]' : 'b-[var(--error-color)]'
              )}>
                <nav class={cn(
                  'flex flex-nowrap overflow-auto mx-1em py-0 scrollbar-hide',
                  '[&>span]:(shrink-0 inline-block p-.5em text-[var(--emoji-nav-text)] whitespace-nowrap)',
                  '[&>span.selected]:text-[var(--emoji-nav-text-selected)]',
                )}>
                  <span class="selected">选中</span>
                  {navList.map(item => <span>{item}</span>)}
                </nav>

                <ul class={cn(
                  'scrollbar-hide overflow-auto max-h-[calc(1.5em_*_12)]',
                  'flex flex-wrap px-.5em py-0 text-22px line-height-1.5em',
                  'children:(grow-0 shrink-0 w-10%) text-center',
                )}>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                  <li>🐶</li>
                </ul>

              </div>

            </div>

            <div class="m-t-.25em text-12px color-[var(--error-color)]">
              <span>必填</span>
            </div>
          </label>
        </div>

        <p class="tips flex-grow-0 text-center py-1em px-0 min-h-[var(--input-min-height)]">记账时长按即可进行编辑</p>

        <div class="formRow flex-grow-0 mt-0.5em min-h-[var(--input-min-height)]">
          <div class="formValue mt-0.25em">
            <BarButton class="formItem button formItem_value">确定</BarButton>
          </div>
        </div>
      </form>
    )
  },
})
