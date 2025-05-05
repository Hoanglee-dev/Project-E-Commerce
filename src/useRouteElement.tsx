import path from 'path'
import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import RegisterLayout from './layouts'

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routeElements
}
