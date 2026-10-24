import { computed, defineComponent, type PropType, ref } from 'vue'
import { Overlay } from 'vant'
import { FormContainer } from '@/components/form/FormContainer.tsx'
import { FormItem } from '@/components/form/FormItem.tsx'
import cssVars from '@/assets/styles/vars.module.scss'

/**
 * @Description: 自定义日期范围弹出框
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 18:16:07
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-24 20:51:25
 * @FilePath: src/modules/items/CustomDateRangeOverlay.tsx
 */
export const CustomDateRangeOverlay = defineComponent({
  name: 'CustomDateRangeOverlay',
  props: {
    visibleValue: { type: Boolean as PropType<boolean>, default: false, },
    customStartDate: { type: String as PropType<string>, default: '', },
    customEndDate: { type: String as PropType<string>, default: '', },
  },
  emits: ['update:visibleValue', 'update:customStartDate', 'update:customEndDate',],
  setup( _props, _ctx ) {
    const {zIndexFloatOverlay,} = cssVars
    const getVisibleValue = computed({
      get() {return _props.visibleValue},
      set(value) {_ctx.emit('update:visibleValue', value)}
    })
    const lastStarDate = ref(_props.customStartDate)
    const lastEndDate = ref(_props.customEndDate)
    const getCustomStartDate = computed({
      get() {return _props.customStartDate},
      set(value) {_ctx.emit('update:customStartDate', value)}
    })
    const getCustomEndDate = computed({
      get() {return _props.customEndDate},
      set(value) {_ctx.emit('update:customEndDate', value)}
    })
    const onSubmitCustomDateRange = (e: SubmitEvent) => {
        e.preventDefault()
        _ctx.emit('update:visibleValue', false)
        _ctx.emit('update:customStartDate', getCustomStartDate.value)
        _ctx.emit('update:customEndDate', getCustomEndDate.value)
        lastStarDate.value = getCustomStartDate.value
        lastEndDate.value = getCustomEndDate.value
      }
    const onCancelCustomDateRange = () => {
      _ctx.emit('update:visibleValue', false)
      getCustomStartDate.value = lastStarDate.value
      getCustomEndDate.value = lastEndDate.value
    }
    const startDateVisibleRef = ref(false)
    const endDateVisibleRef = ref(false)
    return () => (
      <Overlay
        z-index={zIndexFloatOverlay}
        show={getVisibleValue.value}
        onClick={onCancelCustomDateRange}
        class="flex items-center justify-center bg-[var(--overlay-mask-bg)]" >
        <div
          onClick={(e: MouseEvent) => e.stopPropagation()}
          class="bg-[var(--overlay-bg)] w-80vw h-[clamp(340px,35vh,400px)]">
          <header class="bg-[var(--main)] text-[var(--dialog-header-text)] py-12px px-1em">
            请选择时间
          </header>
          <main>
            <FormContainer onSubmit={onSubmitCustomDateRange}>
              <FormItem
                type="date"
                label="开始时间"
                v-model={getCustomStartDate.value}
                v-model:visibleValue={startDateVisibleRef.value} />
              <FormItem
                type="date"
                label="结束时间"
                v-model={getCustomEndDate.value}
                v-model:visibleValue={endDateVisibleRef.value} />
              <footer class="flex justify-between mt-1em children:(w-[calc(50%-.25em)])">
                <FormItem
                  type="button"
                  onClick={onCancelCustomDateRange}
                  buttonConfig={{level: 'default', text: '取 消' }}/>
                <FormItem
                  type="submit"
                  buttonConfig={{level: 'primary', text: '确 认' }}/>
              </footer>
            </FormContainer>
          </main>
        </div>
      </Overlay>
    )
  },
})
