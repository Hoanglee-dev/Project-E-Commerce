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
  confirm_password: yup.string().oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})

const loginSchema = schema.omit(['confirm_password'])
export type loginSchema = yup.InferType<typeof loginSchema>
export type registerSchema = yup.InferType<typeof schema>
