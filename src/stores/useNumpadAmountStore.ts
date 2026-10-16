import { defineStore } from 'pinia'
import { ref } from 'vue'
import { showNotify } from 'vant'

/**
 * @Description: 命名规范 `use<Xxx>Store`
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026/10/15 22:45
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-16 20:41:33
 * @FilePath: src/stores/useNumpadAmountStore.ts
 */
export const useNumpadAmountStore = defineStore('numpadAmount', () => {
  const amountRef = ref('0.00')


  const appendText = (inputText: string) => {
    // 如果当前金额为'0.00'，则清空金额
    if(amountRef.value === '0.00') { amountRef.value = ''}
    // 小数点后已经有两位数字，则不能再输入
    if(amountRef.value.match(/\.\d{2}/)) {return}
    // 已经有'.'，则不能再输入'.'
    if(amountRef.value.match(/\./) && inputText === '.') {return}
    // 输入'.'，判断是否'.'在首位，再则补零
    if(inputText === '.' && amountRef.value === '') {
      amountRef.value = '0'
    }
    // 输入 '0'，判断金额是否为'0'，是则不输入
    if(amountRef.value === '0' && inputText === '0') {
      return
    }
    // 输入 '1' ~' 9'.判断金额是否为'0'，是则替换为1~9
    if((/[1-9]/g).test(inputText) && amountRef.value === '0') {
      amountRef.value = inputText
      return
    }
    // 小数点前超过10位数字，则不能再输入，并弹出嘲讽
    if(amountRef.value.length > 10) {
      showNotify({ type: 'warning', position: 'bottom', message: '输入的数字长度不支持超过10位', })
      return
    }
    amountRef.value += inputText
  }

  const clearText = () => { amountRef.value = '0.00' }

  const backspaceText = () => {
    amountRef.value = amountRef.value.slice(0, -1)
    if(amountRef.value === '') { amountRef.value = '0'}
  }

  return {
    amountRef,
    appendText,
    clearText,
    backspaceText,
  }
})
