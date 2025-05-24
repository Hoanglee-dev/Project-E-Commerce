import React from 'react'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'

export default function App() {
  const routeElements = useRouteElement()
  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}
