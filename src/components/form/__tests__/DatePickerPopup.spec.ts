import { mount } from '@vue/test-utils'
import { defineComponent, h, ref, type PropType } from 'vue'
import { describe, expect, it } from 'vitest'
import { DatePickerPopup } from '../DatePickerPopup.tsx'

const selectedValues = ['2026', '10', '23']

const PopupStub = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Popup',
  props: { show: Boolean },
  emits: ['update:show', 'clickOverlay', 'close'],
  setup(_props, { emit, slots }) {
    return () =>
      h('div', [
        h('button', { 'data-test': 'popup-overlay', onClick: () => emit('clickOverlay') }),
        h('button', { 'data-test': 'popup-close', onClick: () => emit('close') }),
        slots.default?.(),
      ])
  },
})

const DatePickerStub = defineComponent({
  name: 'DatePicker',
  props: {
    modelValue: { type: Array as PropType<string[]>, default: () => [] },
  },
  emits: ['update:modelValue', 'confirm', 'cancel'],
  setup(_props, { emit }) {
    return () =>
      h('div', [
        h('button', {
          'data-test': 'date-picker-change',
          onClick: () => emit('update:modelValue', selectedValues),
        }),
        h('button', {
          'data-test': 'date-picker-confirm',
          onClick: () => emit('confirm', { selectedValues }),
        }),
        h('button', { 'data-test': 'date-picker-cancel', onClick: () => emit('cancel') }),
      ])
  },
})

function mountDatePickerPopup() {
  const dateStr = ref('2026-10-22')
  const popupVisible = ref(true)
  const Parent = defineComponent({
    setup() {
      return () =>
        h(DatePickerPopup, {
          dateStr: dateStr.value,
          popupVisible: popupVisible.value,
          'onUpdate:dateStr': (value: string) => (dateStr.value = value),
          'onUpdate:popupVisible': (value: boolean) => (popupVisible.value = value),
        })
    },
  })
  const wrapper = mount(Parent, {
    global: {
      stubs: {
        Popup: PopupStub,
        DatePicker: DatePickerStub,
        'van-popup': PopupStub,
        'van-date-picker': DatePickerStub,
      },
    },
  })

  return { wrapper, dateStr, popupVisible }
}

describe('DatePickerPopup', () => {
  it('converts the date model and commits a confirmed selection', async () => {
    const { wrapper, dateStr, popupVisible } = mountDatePickerPopup()
    const datePicker = wrapper.findComponent(DatePickerStub)

    expect(datePicker.props('modelValue')).toEqual(['2026', '10', '22'])

    await wrapper.get('[data-test="date-picker-change"]').trigger('click')
    expect(dateStr.value).toBe('2026-10-23')

    await wrapper.get('[data-test="date-picker-confirm"]').trigger('click')
    expect(dateStr.value).toBe('2026-10-23')
    expect(popupVisible.value).toBe(false)

    wrapper.unmount()
  })

  it('restores the previous date when selection is cancelled', async () => {
    const { wrapper, dateStr, popupVisible } = mountDatePickerPopup()

    await wrapper.get('[data-test="date-picker-change"]').trigger('click')
    expect(dateStr.value).toBe('2026-10-23')

    await wrapper.get('[data-test="date-picker-cancel"]').trigger('click')
    expect(dateStr.value).toBe('2026-10-22')
    expect(popupVisible.value).toBe(false)

    wrapper.unmount()
  })
})
