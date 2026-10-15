import { computed, defineComponent, ref } from 'vue'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { DatePicker, Popup } from 'vant'
import { time } from '@/shared/time.ts'

/**
 * @Description: 日期输入
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-15 23:51:13
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-15 23:52:48
 * @FilePath: src/modules/items/DateInput.tsx
 */
export const DateInput = defineComponent({
  name: 'DateInput',
  setup(/* _props, _ctx */) {
    const datePickerVisibleRef = ref(false)
    const lastDateRef = ref(['2026', '11', '01'])
    const currentDateRef = ref(['2026', '11', '01'])
    const minDate = new Date(2025, 1, 1)
    const maxDate = new Date(2028, 0, 1)
    const formattedDateStr = computed(() =>
      time(new Date(currentDateRef.value.join('-'))).api.format(),
    )
    const toggleDatePicker = () => {
      datePickerVisibleRef.value = !datePickerVisibleRef.value
    }
    const confirmDate = ({ selectedValues }: {selectedValues: string[]}) => {
      lastDateRef.value = selectedValues
      currentDateRef.value = selectedValues
      datePickerVisibleRef.value = false
    }
    const cancelDate = () => {
      currentDateRef.value = lastDateRef.value
      datePickerVisibleRef.value = false
    }

    return () => (
      <span class="flex justify-start items-center">
        <SvgIcon onClick={toggleDatePicker} name="date" class="size-2em mx-1 fill-[var(--button-bg)]" />
        <span class="animation-rainbow text-14px font-mono color-[var(--vp-c-brand-next)]">
          <span onClick={toggleDatePicker}>{formattedDateStr.value}</span>
          <Popup
            position="bottom"
            v-model:show={datePickerVisibleRef.value}
            onClose={cancelDate}>
            <DatePicker
              title="选择年月日"
              v-model={currentDateRef.value}
              minDate={minDate}
              maxDate={maxDate}
              onConfirm={confirmDate}
              onCancel={cancelDate}/>
          </Popup>
        </span>
      </span>
    )
  },
})
