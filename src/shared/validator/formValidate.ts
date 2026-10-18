interface FormDataType {
  [key: string]: string | number | null | undefined | FormDataType
}

type Rule<T> = {
  key: keyof T
  message: string
} & (
  { type: 'required', required: boolean } |
  { type: 'pattern', regexp: RegExp }
  )
type Rules<T> = Rule<T>[]
type ErrorsType<T extends FormDataType> = { [k in keyof T]?: string[] }

/**
 * @Description: 验证表单
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-18 22:02:08
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-18 23:15:14
 * @FilePath: src/shared/validator/formValidate.ts
 */
export const formValidate = <T extends FormDataType>(
  formData: T,
  rules: Rules<T>,
): ErrorsType<T> => {
  const errors: ErrorsType<T> = {}

  rules.forEach(rule => {
    const { key, message, type, } = rule
    const value = formData[key as keyof T]
    if(type === 'required') {
      errors[key] = [message]
    }else if(type === 'pattern' && value && !rule.regexp.test(value.toString())) {
      errors[key] = [message]
    }
  })

  return errors
}
