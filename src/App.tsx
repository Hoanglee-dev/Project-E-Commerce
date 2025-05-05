import React from 'react'
import useRouteElement from './useRouteElement'

export default function App() {
  const routeElements = useRouteElement()
  return <>{routeElements}</>
}
