import { computed, defineComponent, type PropType, ref } from 'vue'
import { DatePicker, Popup } from 'vant'
import { DateTime } from '@/shared/dateTime.ts'
import { genDateStr } from '@/const/genDateStr.ts'

/**
 * @Description: 弹出日期选择器组件
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-22 14:44:36
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 17:30:04
 * @FilePath: src/components/form/DatePickerPopup.tsx
 */
export const DatePickerPopup = defineComponent({
  name: 'DatePickerPopup',
  props: {
    popupVisible: { type: Boolean as PropType<boolean>, default: false, },
    dateStr: { type: String as PropType<string>, default: () => genDateStr(), }
  },
  emits: ['update:popupVisible', 'update:dateStr',],
  setup( _props, _ctx ) {
    const lastDateStrRef = ref<string>(_props.dateStr ?? genDateStr())
    const [minDate, maxDate,] = [
      new DateTime(new Date()).add(-1, 'year').getRawDate(),
      new DateTime(new Date()).add(1, 'year').getRawDate(),
    ]
    const getPopupVisible = computed({
      get: () => _props.popupVisible,
      set: (value) => _ctx.emit('update:popupVisible', value),
    })
    const getDateStrArrayTransfer = computed({
      // '2026-10-22' -> [2026, 10, 22]
      get: () => _props.dateStr.split('-'),
      // [2026, 10, 22] -> '2026-10-22'
      set: (value: string[]) => _ctx.emit('update:dateStr', value.join('-')),
    })
    const confirmDate = ({ selectedValues }: { selectedValues: string[] }) => {
      lastDateStrRef.value = selectedValues.join('-') // '2026-10-22'
      getDateStrArrayTransfer.value = selectedValues // [2026, 10, 22]
      getPopupVisible.value = false
    }
    const cancelDate = () => {
      getDateStrArrayTransfer.value = lastDateStrRef.value.split('-') // [2026, 10, 22]
      getPopupVisible.value = false
    }

    return () => (
      <Popup
        position="bottom"
        v-model:show={getPopupVisible.value}
        onClose={cancelDate}>
        <DatePicker
          title="选择年月日"
          v-model={getDateStrArrayTransfer.value}
          minDate={minDate}
          maxDate={maxDate}
          onConfirm={confirmDate}
          onCancel={cancelDate}/>
      </Popup>
    )
  },
})
