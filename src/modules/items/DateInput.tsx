import { computed, defineComponent, ref } from 'vue'
import { SvgIcon } from '@/components/icons/SvgIcon.tsx'
import { DateTime } from '@/shared/dateTime.ts'
import { DatePickerPopup } from '@/modules/items/DatePickerPopup.tsx'
// import { DatePicker, Popup } from 'vant'

/**
 * @Description: 日期输入
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-15 23:51:13
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 15:48:12
 * @FilePath: src/modules/items/DateInput.tsx
 */
export const DateInput = defineComponent({
  name: 'DateInput',
  setup(/* _props, _ctx */) {
    const datePickerVisibleRef = ref(false)
    const nowDate = new Date()
    const jsonDateStr = JSON.stringify([`${nowDate.getFullYear()}`, `${nowDate.getMonth() + 1}`, `${nowDate.getDate()}`])
    // const lastDateRef = ref<string[]>(JSON.parse(jsonDateStr))
    const currentDateRef = ref<string[]>(JSON.parse(jsonDateStr))
    const formattedDateStr = computed(() =>
      (new DateTime(new Date(currentDateRef.value.join('-')))).format(),
    )
    const toggleDatePicker = () => {
      datePickerVisibleRef.value = !datePickerVisibleRef.value
    }

    /*
    const [minDate, maxDate,] = [
      new DateTime(new Date()).add(-1, 'year').getRawDate(),
      new DateTime(new Date()).add(1, 'year').getRawDate(),
    ]
    const confirmDate = ({ selectedValues }: { selectedValues: string[] }) => {
      lastDateRef.value = selectedValues
      currentDateRef.value = selectedValues
      datePickerVisibleRef.value = false
    }
    const cancelDate = () => {
      currentDateRef.value = lastDateRef.value
      datePickerVisibleRef.value = false
    }
    */

    return () => (
      <span class="flex justify-start items-center">
        <SvgIcon
          onClick={toggleDatePicker}
          name="date"
          class="size-2em mx-1 fill-[var(--button-main)]"
        />
        <span class="animation-rainbow text-14px font-mono color-[var(--vp-c-brand-next)]">
          <span onClick={toggleDatePicker}>{formattedDateStr.value}</span>
          <DatePickerPopup
            v-model:popupVisible={datePickerVisibleRef.value}
            v-model:dateStrArray={currentDateRef.value}
          />
          {/*
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
              onCancel={cancelDate}
            />
          </Popup>
          */}

        </span>
      </span>
    )
  },
})
