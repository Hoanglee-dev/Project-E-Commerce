import React from 'react'
import Footer from '~/components/Footer'
import RegisterHeader from '~/components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen'>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
