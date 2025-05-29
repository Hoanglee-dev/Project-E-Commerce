import UserSideNav from '../components/UserSideNav'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <>
      <UserSideNav />
      <Outlet />
    </>
  )
}
