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

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: yup.string().min(6, 'Độ dài từ 6 - 60 kí tự').max(160, 'Độ dài từ 6 - 60 kí tự'),
  new_password: yup.string().min(6, 'Độ dài từ 6 - 60 kí tự').max(160, 'Độ dài từ 6 - 60 kí tự'),
  confirm_password: yup.string().oneOf([yup.ref('new_password')], 'Nhập lại password không khớp')
})

export const loginSchema = schema.omit(['confirm_password', 'name'])
export const registerSchema = schema.omit(['name'])
export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
export type UserSchema = yup.InferType<typeof userSchema>
