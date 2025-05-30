import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 60 kí tự')
    .max(160, 'Độ dài từ 6 - 60 kí tự'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
    .required('password là bắt buộc'),
  name: yup.string().trim().required('Nhập tên sản phẩm là bắt buộc')
})

export const loginSchema = schema.omit(['confirm_password', 'name'])
export const registerSchema = schema.omit(['name'])
export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
