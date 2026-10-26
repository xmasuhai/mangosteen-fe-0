export interface FormDataType {
  [key: string]: string | number | null | undefined | FormDataType
}

export type FormRule<T> = {
  key: keyof T
  message: string
} & ({ type: 'required'; required: boolean } | { type: 'pattern'; regexp: RegExp })
export type FormRules<T> = FormRule<T>[]
export type FormErrorsType<T extends FormDataType> = { [k in keyof T]?: string[] }

/**
 * @Description: 验证表单
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-18 22:02:08
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-19 21:00:05
 * @FilePath: src/shared/validator/formValidate.ts
 */
export const formValidate = <T extends FormDataType>(
  formData: T,
  rules: FormRules<T>,
): FormErrorsType<T> => {
  const errors: FormErrorsType<T> = {}

  rules.forEach((rule) => {
    const { key, message, type } = rule
    const value = formData[key] satisfies FormDataType[string]
    switch (type) {
      case 'required':
        if (isEmpty(value)) {
          errors[key] ??= []
          errors[key].push(message)
        }
        break
      case 'pattern':
        if (isEmpty(value) || !rule.regexp.test(value!.toString())) {
          errors[key] ??= []
          errors[key].push(message)
        }
        break
      default:
        return
    }
  })
  return errors
}

export function isEmpty(value: FormDataType[string]) {
  return [null, undefined, ''].includes(value?.toString())
}
