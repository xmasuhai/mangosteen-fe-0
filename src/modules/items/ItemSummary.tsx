import { defineComponent, type PropType } from 'vue'
import { cn } from 'cn'

/**
 * @Description: 记账总览组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-19 22:52:49
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-23 22:58:52
 * @FilePath: src/modules/items/ItemSummary.tsx
 */
export const ItemSummary = defineComponent({
  name: 'ItemSummary',
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
      // validator: (/* value */) => true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
      // validator: (/* value */) => true,
    },
  },
  setup( _props, _ctx ) {

    return () => (
      <div class="flex flex-col h-[calc(100vh-136px)] scrollbar-hide relative">
        <ul class={cn(
          'bg-[var(--total-bg)] text-[var(--total-text)]',
          'grow-0 shrink-0 flex justify-between',
          'm-1em py-0 px-1em rounded-[var(--button-radius)]',
        )}>
          <li class="p-1em flex flex-col text-center color-[var(--total-income)]"><span>收入</span><span>¥ 128.00</span></li>
          <li class="p-1em flex flex-col text-center color-[var(--total-expenses)]"><span>支出</span><span>¥ 99.00</span></li>
          <li class="p-1em flex flex-col text-center color-[var(--total-text)]"><span>净收入</span><span>¥ 39.00</span></li>
        </ul>

        <div class="max-h-[calc(100%-112px)] grow-1 shrink-1 overflow-auto scrollbar-hide">
          <ul class="[&>li]:[--sibling-idx:calc(1*sibling-index())] [&>li>div:first-child]:bg-[oklch(70%_0.15_calc(var(--sibling-idx)*70))]">
            <li class="flex justify-between items-start py-12px px-1em b-b-1px b-b-[var(--button-border-color)]">
              <div class="sign grow-0 shrink-0 size-48px rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                <span>😀</span>
              </div>
              <div class="mx-.25em grow-1 shrink-1">
                <div class="flex justify-between">
                  <span class="text-[var(--list-tag-text)]">旅行</span>
                  <span class="text-[var(--list-amount-text)]">¥1234.00</span>
                </div>
                <div class="text-[var(--list-time-text)] mt-.25em">
                  2027-01-01 12:00:00
                </div>
              </div>
            </li>

            <li class="flex justify-between items-start py-12px px-1em b-b-1px b-b-[var(--button-border-color)]">
              <div class="sign grow-0 shrink-0 size-48px rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                <span>😀</span>
              </div>
              <div class="mx-.25em grow-1 shrink-1">
                <div class="flex justify-between">
                  <span class="text-[var(--list-tag-text)]">旅行</span>
                  <span class="text-[var(--list-amount-text)]">¥1234.00</span>
                </div>
                <div class="text-[var(--list-time-text)] mt-.25em">
                  2027-01-01 12:00:00
                </div>
              </div>
            </li>
            <li class="flex justify-between items-start py-12px px-1em b-b-1px b-b-[var(--button-border-color)]">
              <div class="sign grow-0 shrink-0 size-48px rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                <span>😀</span>
              </div>
              <div class="mx-.25em grow-1 shrink-1">
                <div class="flex justify-between">
                  <span class="text-[var(--list-tag-text)]">旅行</span>
                  <span class="text-[var(--list-amount-text)]">¥1234.00</span>
                </div>
                <div class="text-[var(--list-time-text)] mt-.25em">
                  2027-01-01 12:00:00
                </div>
              </div>
            </li>
            <li class="flex justify-between items-start py-12px px-1em b-b-1px b-b-[var(--button-border-color)]">
              <div class="sign grow-0 shrink-0 size-48px rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                <span>😀</span>
              </div>
              <div class="mx-.25em grow-1 shrink-1">
                <div class="flex justify-between">
                  <span class="text-[var(--list-tag-text)]">旅行</span>
                  <span class="text-[var(--list-amount-text)]">¥1234.00</span>
                </div>
                <div class="text-[var(--list-time-text)] mt-.25em">
                  2027-01-01 12:00:00
                </div>
              </div>
            </li>
            <li class="flex justify-between items-start py-12px px-1em b-b-1px b-b-[var(--button-border-color)]">
              <div class="sign grow-0 shrink-0 size-48px rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                <span>😀</span>
              </div>
              <div class="mx-.25em grow-1 shrink-1">
                <div class="flex justify-between">
                  <span class="text-[var(--list-tag-text)]">旅行</span>
                  <span class="text-[var(--list-amount-text)]">¥1234.00</span>
                </div>
                <div class="text-[var(--list-time-text)] mt-.25em">
                  2027-01-01 12:00:00
                </div>
              </div>
            </li>
            <li class="flex justify-between items-start py-12px px-1em b-b-1px b-b-[var(--button-border-color)]">
              <div class="sign grow-0 shrink-0 size-48px rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                <span>😀</span>
              </div>
              <div class="mx-.25em grow-1 shrink-1">
                <div class="flex justify-between">
                  <span class="text-[var(--list-tag-text)]">旅行</span>
                  <span class="text-[var(--list-amount-text)]">¥1234.00</span>
                </div>
                <div class="text-[var(--list-time-text)] mt-.25em">
                  2027-01-01 12:00:00
                </div>
              </div>
            </li>
            <li class="flex justify-between items-start py-12px px-1em b-b-1px b-b-[var(--button-border-color)]">
              <div class="sign grow-0 shrink-0 size-48px rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                <span>😀</span>
              </div>
              <div class="mx-.25em grow-1 shrink-1">
                <div class="flex justify-between">
                  <span class="text-[var(--list-tag-text)]">旅行</span>
                  <span class="text-[var(--list-amount-text)]">¥1234.00</span>
                </div>
                <div class="text-[var(--list-time-text)] mt-.25em">
                  2027-01-01 12:00:00
                </div>
              </div>
            </li>
            <li class="flex justify-between items-start py-12px px-1em b-b-1px b-b-[var(--button-border-color)]">
              <div class="sign grow-0 shrink-0 size-48px rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                <span>😀</span>
              </div>
              <div class="mx-.25em grow-1 shrink-1">
                <div class="flex justify-between">
                  <span class="text-[var(--list-tag-text)]">旅行</span>
                  <span class="text-[var(--list-amount-text)]">¥1234.00</span>
                </div>
                <div class="text-[var(--list-time-text)] mt-.25em">
                  2027-01-01 12:00:00
                </div>
              </div>
            </li>
            <li class="flex justify-between items-start py-12px px-1em b-b-1px b-b-[var(--button-border-color)]">
              <div class="sign grow-0 shrink-0 size-48px rounded-[50%] flex justify-center items-center my-0 mx-.5em">
                <span>😀</span>
              </div>
              <div class="mx-.25em grow-1 shrink-1">
                <div class="flex justify-between">
                  <span class="text-[var(--list-tag-text)]">旅行</span>
                  <span class="text-[var(--list-amount-text)]">¥1234.00</span>
                </div>
                <div class="text-[var(--list-time-text)] mt-.25em">
                  2027-01-01 12:00:00
                </div>
              </div>
            </li>
          </ul>

          <div class="pt-2em mb-2em text-center">向下滑动加载更多</div>
        </div>
      </div>
    )
  },
})
