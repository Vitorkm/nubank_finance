'use client'

import { NubankApi } from "nubank-api";
import { createContext } from "react";

export const NubankContext = createContext({} as NubankApi);

export const NubankProvider = ({children}: { children: React.ReactNode }) => {
  return (
    <NubankContext.Provider value={new NubankApi()}>
      {children}
    </NubankContext.Provider>
  );
}

export default NubankProvider;