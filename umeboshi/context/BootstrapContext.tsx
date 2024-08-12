/**
 * Bootstrap Context
 */

'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

interface BootstrapContextType {
  bootstrapState: any
}

const BootstrapContext = createContext<BootstrapContextType | undefined>(undefined);

export default function BootstrapProvider({
  children,
}: {
  children: ReactNode,
}) {
  // State
  const [bootstrapState, setBootstrapState] = useState<any>(undefined);

  // Effect
  useEffect(() => {
    if (!bootstrapState) {
      const js = require('bootstrap/dist/js/bootstrap.bundle.min.js');
      setBootstrapState(js);
    }
  }, [bootstrapState])

  return (
    <BootstrapContext.Provider value={{ bootstrapState: bootstrapState }}>
      {children}
    </BootstrapContext.Provider>
  );
}

export const useBootstrap = (): BootstrapContextType => {
  const context = useContext(BootstrapContext)
  if (!context) {
    throw new Error('useBootstrap must be used within a BootstrapProvider')
  }
  return context;
}
