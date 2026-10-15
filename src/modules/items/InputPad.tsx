import { computed, defineComponent, ref } from 'vue'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { NumberOutput } from '@/modules/items/NumberOutput.tsx'
import { Numpad } from '@/modules/items/Numpad.tsx'
import { time } from '@/shared/time.ts'
import { DatePicker, Popup } from 'vant'

/**
 * @Description: 数字键盘组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-14 22:46:46
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-15 20:18:13
 * @FilePath: src/modules/items/InputPad.tsx
 */
export const InputPad = defineComponent({
  name: 'InputPad',
  setup(/* _props, _ctx */) {
    const datePickerVisible = ref(false)
    const currentDateRef = ref(['2026', '11', '01'])
    const minDate = new Date(2025, 1, 1)
    const maxDate = new Date(2028, 1, 1)
    const formattedDateStr = computed(() =>
      time(new Date(currentDateRef.value.join('-'))).api.format(),)

    return () => (
      <>
        {/* 日期、金额输入 */}
        <div class="flex justify-between items-center py-1em b-t-[var(--button-border-color)] b-t-1">
          <span class="flex justify-start items-center">
            <SvgIcon name="date" class="size-2em mx-1 fill-[var(--button-bg)]" />
            <span class="animation-rainbow text-14px font-mono color-[var(--vp-c-brand-next)]">
              <span
                onClick={() => {datePickerVisible.value = !datePickerVisible.value}}>
                {formattedDateStr.value}
              </span>
              <Popup position="bottom" v-model:show={datePickerVisible.value}>
                <DatePicker
                  title="选择年月日"
                  v-model={currentDateRef.value}
                  minDate={minDate}
                  maxDate={maxDate}
                  onConfirm={({selectedValues,}) => {
                    currentDateRef.value = selectedValues
                    datePickerVisible.value = false
                  }}/>
              </Popup>
            </span>
          </span>

          <NumberOutput class="mr-4" />
        </div>

        {/* 数字键盘 */}
        <Numpad />
      </>
    )
  },
})
