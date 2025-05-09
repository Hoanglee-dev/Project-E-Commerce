import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '~/utils/auth'

export interface AppcontextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialContext: AppcontextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppcontextInterface>(initialContext)

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
