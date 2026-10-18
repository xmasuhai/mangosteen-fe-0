export interface FormDataType {
  [key: string]: string | number | null | undefined | FormDataType
}

export type Rule<T> = {
  key: keyof T
  message: string
} & (
  { type: 'required', required: boolean } |
  { type: 'pattern', regexp: RegExp }
  )
export type Rules<T> = Rule<T>[]
export type ErrorsType<T extends FormDataType> = { [k in keyof T]?: string[] }

/**
 * @Description: 验证表单
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-18 22:02:08
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 23:45:14
 * @FilePath: src/shared/validator/formValidate.ts
 */
export const formValidate = <T extends FormDataType>(
  formData: T,
  rules: Rules<T>,
): ErrorsType<T> => {
  const errors: ErrorsType<T> = {}

  rules.forEach(rule => {
    const { key, message, type, } = rule
    const value = formData[key]
    switch(type) {
      case 'required':
        if([null, undefined, ''].includes(value?.toString())) {
          errors[key] ??= []
          errors[key].push(message)
        }
        break
      case 'pattern':
        if(value && !rule.regexp.test(value.toString())) {
          errors[key] ??= []
          errors[key].push(message)
        }
        break
      default: return
    }

  })

  return errors
}
