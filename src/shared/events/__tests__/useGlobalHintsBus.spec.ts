import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import * as vant from 'vant'
import { useGlobalHintsBus } from '../useGlobalHintsBus.ts'
import { useNumpadAmountStore } from '@/stores/useNumpadAmountStore.ts'
import { Numpad } from '@/modules/items/Numpad.tsx'

vi.mock('vant', async () => {
  const actual = await vi.importActual('vant')
  return {
    ...actual,
    showNotify: vi.fn<(options: unknown) => void>(),
  }
})

describe('useGlobalHintsBus & Numpad decoupled hints', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    useGlobalHintsBus().reset()
  })

  it('emits and receives hints via useGlobalHintsBus', () => {
    const bus = useGlobalHintsBus()
    const callback = vi.fn<(hint?: unknown) => void>()
    bus.on(callback)

    bus.emit({ type: 'warning', position: 'bottom', message: '输入的数字长度不支持超过10位' })
    expect(callback).toHaveBeenCalledWith(
      {
        type: 'warning',
        position: 'bottom',
        message: '输入的数字长度不支持超过10位',
      },
      undefined,
    )
  })

  it('triggers bus emit when store input length exceeds 10 digits', () => {
    const bus = useGlobalHintsBus()
    const callback = vi.fn<(hint?: unknown) => void>()
    bus.on(callback)

    const store = useNumpadAmountStore()
    // Initial amount is '0.00'
    // Input 10 digits: '1234567890'
    for (const digit of '1234567890') {
      store.appendText(digit)
    }
    expect(store.amountRef).toBe('1234567890')
    expect(callback).not.toHaveBeenCalled()

    // 11th digit triggers warning
    store.appendText('1')
    expect(callback).toHaveBeenCalledWith(
      {
        type: 'warning',
        position: 'bottom',
        message: '输入的数字长度不支持超过10位',
      },
      undefined,
    )
    expect(store.amountRef).toBe('1234567890')
  })

  it('Numpad component listens to hints bus and calls showNotify', () => {
    const wrapper = mount(Numpad)
    const store = useNumpadAmountStore()

    for (const digit of '12345678901') {
      store.appendText(digit)
    }

    expect(vant.showNotify).toHaveBeenCalledWith({
      type: 'warning',
      position: 'bottom',
      message: '输入的数字长度不支持超过10位',
    })

    wrapper.unmount()
  })
})
