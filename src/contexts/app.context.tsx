import { createContext, useState } from 'react'
import { ExtendedPurchases } from '~/types/purchase.type'
import { User } from '~/types/user.type'
import { getAccessTokenFromLS, getProfileUserFromLS } from '~/utils/auth'

export interface AppcontextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
}

const initialContext: AppcontextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileUserFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}

export const AppContext = createContext<AppcontextInterface>(initialContext)

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])

  const [profile, setProfile] = useState(initialContext.profile)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
