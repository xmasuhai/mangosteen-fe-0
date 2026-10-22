import { defineComponent, ref } from 'vue'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { DatePickerPopup } from '@/components/form/DatePickerPopup.tsx'
import { genDateStr } from '@/const/genDateStr.ts'

/**
 * @Description: 日期输入
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-15 23:51:13
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 17:11:10
 * @FilePath: src/modules/items/DateInput.tsx
 */
export const DateInput = defineComponent({
  name: 'DateInput',
  setup(/* _props, _ctx */) {
    const datePickerVisibleRef = ref(false)
    const currentDateStrRef = ref<string>(genDateStr())
    const toggleDatePicker = () => {
      datePickerVisibleRef.value = !datePickerVisibleRef.value
    }
    return () => (
      <span class="flex justify-start items-center">
        <SvgIcon
          onClick={toggleDatePicker}
          name="date"
          class="size-2em mx-1 fill-[var(--main)]" />
        <span class="animation-rainbow text-14px font-mono color-[var(--vp-c-brand-next)]">
          <span onClick={toggleDatePicker}>{currentDateStrRef.value}</span>
          <DatePickerPopup
            v-model:popupVisible={datePickerVisibleRef.value}
            v-model:dateStr={currentDateStrRef.value} />
        </span>
      </span>
    )
  },
})
