import { computed, defineComponent, type PropType, ref } from 'vue'
import { DatePicker, Popup } from 'vant'
import { DateTime } from '@/shared/dateTime.ts'
import { genDateArray } from '@/const/genDateArray.ts'

/**
 * @Description: 弹出日期选择器组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-22 14:44:36
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 16:30:30
 * @FilePath: src/components/form/DatePickerPopup.tsx
 */
export const DatePickerPopup = defineComponent({
  name: 'DatePickerPopup',
  props: {
    popupVisible: { type: Boolean as PropType<boolean>, default: false, },
    dateStrArray: { type: Array as PropType<string[]>, default: () => genDateArray(), }
  },
  emits: ['update:popupVisible', 'update:dateStrArray'],
  setup( _props, _ctx ) {
    const lastDateRef = ref<string[]>(_props.dateStrArray ?? genDateArray())
    const [minDate, maxDate,] = [
      new DateTime(new Date()).add(-1, 'year').getRawDate(),
      new DateTime(new Date()).add(1, 'year').getRawDate(),
    ]
    const getPopupVisible = computed({
      get: () => _props.popupVisible,
      set: (value) => _ctx.emit('update:popupVisible', value),
    })
    const getDateStrArray = computed({
      get: () => _props.dateStrArray,
      set: (value) => _ctx.emit('update:dateStrArray', value),
    })
    const confirmDate = ({ selectedValues }: { selectedValues: string[] }) => {
      lastDateRef.value = selectedValues
      getDateStrArray.value = selectedValues
      getPopupVisible.value = false
    }
    const cancelDate = () => {
      getDateStrArray.value = lastDateRef.value
      getPopupVisible.value = false
    }
    return () => (
      <Popup
        position="bottom"
        v-model:show={getPopupVisible.value}
        onClose={cancelDate}>
        <DatePicker
          title="选择年月日"
          v-model={getDateStrArray.value}
          minDate={minDate}
          maxDate={maxDate}
          onConfirm={confirmDate}
          onCancel={cancelDate}/>
      </Popup>
    )
  },
})
