'use client'

import { createContext, useState } from "react";
interface NubankContextProps {
  authToken: string | null;
  setAuthToken: (token: string) => void;
}

export const NubankContext = createContext({} as NubankContextProps);

export const NubankProvider = ({children}: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('access_token') || null);
  return (
    <NubankContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </NubankContext.Provider>
  );
}

export default NubankProvider;