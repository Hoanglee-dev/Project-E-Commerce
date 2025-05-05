import React from 'react'

interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      Register layout
      {children}
    </div>
  )
}
