import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGlobalHintsBus } from '@/shared/events/useGlobalHintsBus.ts'

/**
 * @Description: 命名规范 `use<Xxx>Store`
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026/10/15 22:45
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-16 22:22:40
 * @FilePath: src/stores/useNumpadAmountStore.ts
 */
export const useNumpadAmountStore = defineStore('numpadAmount', () => {
  const amountRef = ref('0.00')
  const { emit } = useGlobalHintsBus()

  const appendText = (inputText: string) => {
    const conditions = [
      {
        ruleHint: `输入时，如果当前金额为'0.00'，则清空金额`,
        check: () => amountRef.value === '0.00',
        action: () => {
          amountRef.value = ''
        },
      },
      {
        ruleHint: `小数点后已经有两位数字，则不能再输入`,
        check: () => /\.\d{2}/.test(amountRef.value),
        action: () => {
          inputText = ''
        },
      },
      {
        ruleHint: `已经有'.'，则不能再输入'.'`,
        check: () => amountRef.value.includes('.') && inputText === '.',
        action: () => {
          inputText = ''
        },
      },
      {
        ruleHint: `输入'.'，判断当前金额是否为空，是则首位补零`,
        check: () => inputText === '.' && amountRef.value === '',
        action: () => {
          amountRef.value = '0'
        },
      },
      {
        ruleHint: `输入 '0'，判断金额是否为'0'，是则不输入`,
        check: () => amountRef.value === '0' && inputText === '0',
        action: () => {
          inputText = ''
        },
      },
      {
        ruleHint: `输入 '1' ~ ' 9'，判断当前金额是否为'0'，是则替换为 '1' ~ ' 9'`,
        check: () => /[1-9]/g.test(inputText) && amountRef.value === '0',
        action: () => {
          amountRef.value = inputText
          inputText = ''
        },
      },
      {
        ruleHint: `位数超过10位数字，则不能再输入，并提示`,
        check: () => amountRef.value.replace('.', '').length >= 10,
        action: () => {
          inputText = ''
          emit({ type: 'warning', position: 'bottom', message: '输入的数字长度不支持超过10位' })
        },
      },
    ]
    conditions?.forEach((condition) => {
      if (condition.check()) {
        condition.action()
      }
    })
    amountRef.value += inputText
  }

  const clearText = () => {
    amountRef.value = '0.00'
  }

  const backspaceText = () => {
    amountRef.value = amountRef.value.slice(0, -1)
    // 删空则补零
    if (amountRef.value === '') {
      amountRef.value = '0'
    }
  }

  return {
    amountRef,
    appendText,
    clearText,
    backspaceText,
  }
})
