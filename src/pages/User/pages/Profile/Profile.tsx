import { useMutation, useQuery } from '@tanstack/react-query'
import { pick } from 'lodash'
import { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from '~/apis/user.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import InputNumber from '~/components/InputNumber'
import { userSchema, UserSchema } from '~/utils/rules'
import DateSelect from '../../components/DateSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { AppContext } from '~/contexts/app.context'
import { setProfileUserToLS } from '~/utils/auth'
import userImage from '../../../../assets/svg/user.svg'

type FormData = Pick<UserSchema, 'name' | 'address' | 'avatar' | 'phone' | 'date_of_birth'>

const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'phone', 'date_of_birth'])

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const { data: profileData, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getProfile,
    staleTime: 5 * 60 * 1000
  })
  const profile = profileData?.data.data
  console.log('🚀 ~ Profile ~ profile:', profile)
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      address: '',
      avatar: '',
      name: '',
      phone: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const updateProfileMutation = useMutation({ mutationFn: userApi.updateProfile })

  useEffect(() => {
    if (profile) {
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile])

  const handleUpdateProfile = handleSubmit(async (data) => {
    const res = await updateProfileMutation.mutateAsync({
      ...data,
      date_of_birth: data.date_of_birth?.toISOString()
    })
    setProfile(res.data.data)
    setProfileUserToLS(res.data.data)
    refetch()
    toast.success(res.data.message, {
      autoClose: 1000,
      type: 'success'
    })
  })
  return (
    <>
      <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
        <div className='border-b border-b-gray-200 py-6'>
          <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
          <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 hover:border-orange focus:border-orange px-3 py-2 outline-none  focus:shadow-sm'
                  name='name'
                  register={register}
                  placeholder='Tên'
                  errorMessage={errors.name?.message}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <InputNumber
                      classNameInput='w-full rounded-sm border border-gray-300 hover:border-orange focus:border-orange  px-3 py-2 outline-none  focus:shadow-sm'
                      placeholder='Số điện thoại'
                      onChange={field.onChange}
                      value={field.value}
                      errorMessage={errors.phone?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 hover:border-orange focus:border-orange  px-3 py-2 outline-none focus:shadow-sm'
                  name='address'
                  placeholder='Địa chỉ'
                  register={register}
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  onClick={handleUpdateProfile}
                  className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  type='submit'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img src={profile?.avatar || userImage} className='h-full w-full rounded-full object-cover' />
              </div>
              <div className='mt-3 text-gray-400'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
